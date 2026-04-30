
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { CustomModalForm } from '@/components/custom-modal-form';
import { CustomToast, toast } from '@/components/custom-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CustomTable } from '@/components/ui/custom-table';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { GroupTableConfig } from '@/components/config/tables/group-table';
import { GroupModalFormConfig } from '@/components/config/form/group-modal-form';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Group',
        href: '/groups',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Group {
    id: number;
    group: string;
    description: string;
}

interface GroupPagination {
    data: Group[];
    links: LinkProps;
    from: number;
    to: number;
    total: number;
}
interface FilterProps {
    search: string;
    perPage: string;
}

interface FlashProps extends Record<string, any> {
    flash?: {
        success?: string;
        error?: string;
    };
}

interface IndexProps {
    groups: GroupPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}


export default function Index({groups, totalCount, filteredCount } : IndexProps) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedGroup, setSelectedGroup ] = useState<any>(null);
    const [ previewImage, setPreviewImage ] = useState<string | null>(null);

    const {data, setData, errors, processing, reset, post} = useForm({
        group: '',
        description: '',
        _method: 'POST',
        search: '',
        perPage: '10'
    });


        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString =  {
            ...(value && {search: value}),
            ...(data.perPage && {perPage: data.perPage}),
        }

        router.get(route('groups.index'), queryString, {
            preserveState: true,
            preserveScroll: true,

        })

    }

    // reset search
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.get(route('groups.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        })
    }


    // handle delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            // console.log('route:', route);
            router.delete(route, {
                preserveScroll: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Group deleted successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                 onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to delete group'
                     toast.error(errorMessage);
    
                }
            });
            // toast.success(flashMessage);
        }
    }

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault();

        // edit mode
        if (mode === 'edit' && selectedGroup) {

            data._method = 'PUT';

            post(route('groups.update', selectedGroup.id), {
                forceFormData: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Group updated successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to updated group'
                     toast.error(errorMessage);
    
                }
            });

        // create mode
        } else {
            console.log('data-->', data);
            post(route('groups.store'), {
               onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Group created successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to create group'
                     toast.error(errorMessage);
    
                }
            });
        }

        
    }

    // closing modal
    const closeModal = () => {
        setMode('create');
        setPreviewImage(null);
        setSelectedGroup(null);
        reset();
        setModalOpen(false);
    };

    // handle modal toggle
    const handleModalToggle = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setMode('create');
            setPreviewImage(null);
            setSelectedGroup(null);
            reset();
        }
    };

    // open modal
    const openModal = (mode: 'create' | 'view' | 'edit', group?: any) => {
        setMode(mode);

        if (group) {
            Object.entries(group).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });

            // setting image preview
            setPreviewImage(group.image);
            setSelectedGroup(group);
        } else {
            // console.log(data);
        }

        setModalOpen(true);
    }

    const handlePerPageCange = (value: string) => {
        setData('perPage', value);

        const queryString =  {
            ...(data.search && {search: data.search}),
            ...(value && {perPage: value}),
        }

        // kirim querystring perpage to serverside php
        router.get(route('portions.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        })

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Group" />

            <CustomToast />

            <div className='flex h-full flex-1 flex-col rounded-xl p-4'>

                {/* custom modal form */}
                <div className='ml-auto w-full'>
                   <CustomModalForm 
                   addButton={GroupModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View Group' : (mode === 'edit' ? 'Update Group' : GroupModalFormConfig.title)}
                   description={GroupModalFormConfig.description}
                   fields={GroupModalFormConfig.fields}
                   buttons={GroupModalFormConfig.buttons}
                   data={data}
                   setData={setData}
                   errors={errors}
                   processing={processing}
                   handleSubmit={handleSubmit}
                   open={modalOpen}
                   onOpenChange={handleModalToggle}
                   mode={mode}
                   previewImage={previewImage}
                   handleSearch={handleSearch}
                   handleReset={handleReset}
                   />
                </div>

                <CustomTable 
                    columns={GroupTableConfig.columns} 
                    actions={GroupTableConfig.actions} 
                    data={groups.data} 
                    from={groups.from} 
                    onDelete={handleDelete}
                    onView={(group) => openModal('view', group)}
                    onEdit={(group) => openModal('edit', group)}
                    isModal={true}
                />

                <Pagination 
                    sumber={groups} 
                    perPage={data.perPage} 
                    onPerPageChange={handlePerPageCange} 
                    totalCount={totalCount} 
                    filteredCount={filteredCount} 
                    search={data.search} 
                />

         </div>
        </AppLayout>
    );
}

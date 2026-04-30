
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
import { SubgroupTableConfig } from '@/components/config/tables/subgroup-table';
import { SubgroupModalFormConfig } from '@/components/config/form/subgroup-modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sub Group',
        href: '/subgroups',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Subgroup {
    id: number;
    group_id: number;
    groups: string;
    subgroup: string;
    description: string;
}

interface SubGroupPagination {
    data: Subgroup[];
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
interface groupProps {
    id: number;
    group: string;
    description: string;
}

interface IndexProps {
    subgroups: SubGroupPagination;
    groups: groupProps;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}


export default function Index({subgroups, totalCount, filteredCount, filters  } : IndexProps) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedGroup, setSelectedGroup ] = useState<any>(null);
    const [ previewImage, setPreviewImage ] = useState<string | null>(null);
    const { props } = usePage();

    const { data, setData, errors, processing, reset, post } = useForm ({
        search: '',
        perPage: '10',
    });


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString =  {
            ...(value && {search: value}),
            ...(data.perPage && {perPage: data.perPage}),
        }

        router.get(route('subgroups.index'), queryString, {
            preserveState: true,
            preserveScroll: true,

        })

    }

    // reset search
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.get(route('subgroups.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    // handle delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            router.delete(route, {
                preserveScroll: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Sub Group deleted successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                 onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to delete sub group'
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

            post(route('subgroups.update', selectedGroup.id), {
                forceFormData: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Sub Group updated successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to updated sub group'
                     toast.error(errorMessage);
    
                }
            });

        // create mode
        } else {
            post(route('subgroups.store'), {
               onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Sub Group created successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to create sub group'
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
    const openModal = (mode: 'create' | 'view' | 'edit', subgroup?: any) => {
        setMode(mode);

        if (subgroup) {
            Object.entries(subgroup).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });

            // setting image preview
            setPreviewImage(subgroup.image);
            setSelectedGroup(subgroup);
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
        router.get(route('subgroups.index'), queryString, {
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
                   addButton={SubgroupModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View Group' : (mode === 'edit' ? 'Update Group' : SubgroupModalFormConfig.title)}
                   description={SubgroupModalFormConfig.description}
                   fields={SubgroupModalFormConfig.fields}
                   buttons={SubgroupModalFormConfig.buttons}
                   data={data}
                   setData={setData}
                   errors={errors}
                   processing={processing}
                   handleSubmit={handleSubmit}
                   open={modalOpen}
                   onOpenChange={handleModalToggle}
                   mode={mode}
                   previewImage={previewImage}
                   extraData={props}
                   handleSearch={handleSearch}
                   handleReset={handleReset}
                   />
                </div>

                <CustomTable 
                    columns={SubgroupTableConfig.columns} 
                    actions={SubgroupTableConfig.actions} 
                    data={subgroups.data} 
                    from={subgroups.from} 
                    onDelete={handleDelete}
                    onView={(subgroup) => openModal('view', subgroup)}
                    onEdit={(subgroup) => openModal('edit', subgroup)}
                    isModal={true}
                />

                <Pagination 
                    sumber={subgroups} 
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

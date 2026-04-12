
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { PermissionModalFormConfig } from '@/components/config/form/permission-modal-form';
import { PermissionTableConfig } from '@/components/config/tables/permission-table';
import { CustomModalForm } from '@/components/custom-modal-form';
import { CustomToast, toast } from '@/components/custom-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CustomTable } from '@/components/ui/custom-table';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Permissions',
        href: '/permissions',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Permission {
    id: number;
    module: string;
    label: string;
    description: string;
}

interface PermissionPagination {
    data: Permission[];
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
    outlets: PermissionPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}


export default function Index({ permissions } : IndexProps) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedOutlet, setSelectedOutlet ] = useState<any>(null);

    const {data, setData, errors, processing, reset, post} = useForm({
        module: '',
        label: '',
        description:'',
        _method: 'POST'
    });

    // handle delete
    const handleDelete = (route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            // console.log('route:', route);
            router.delete(route, {
                preserveScroll: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success;
                   successMessage && toast.success(successMessage);

                    closeModal();
                },
                 onError: (error: Record<string, string>) => {
                     const errorMessage = error.message;
                     errorMessage && toast.error(errorMessage);
    
                }
            });
            // toast.success(flashMessage);
        }
    }

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault();

        // edit mode
        if (mode === 'edit' && selectedOutlet) {

            data._method = 'PUT';

            post(route('permissions.update', selectedOutlet.id), {
                forceFormData: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success;
                    successMessage && toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message;
                    errorMessage && toast.error(errorMessage);
    
                }
            });

        // create mode
        } else {
            post(route('permissions.store'), {
               onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success
                    successMessage && toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error.message
                    errorMessage &&  toast.error(errorMessage);
    
                }
            });
        }

        
    }

    // closing modal
    const closeModal = () => {
        setMode('create');
        setSelectedOutlet(null);
        reset();
        setModalOpen(false);
    };

    // handle modal toggle
    const handleModalToggle = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setMode('create');
            setSelectedOutlet(null);
            reset();
        }
    };

    // open modal
    const openModal = (mode: 'create' | 'view' | 'edit', outlet?: any) => {
        setMode(mode);

        if (outlet) {
            Object.entries(outlet).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });

            // setting image preview
            // setPreviewImage(outlet.image);
            setSelectedOutlet(outlet);
        } else {
            // console.log(data);
        }

        setModalOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Outlet" />

            <CustomToast />

            <div className='flex h-full flex-1 flex-col rounded-xl p-4'>

                {/* custom modal form */}
                <div className='ml-auto'>
                   <CustomModalForm 
                   addButton={PermissionModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View Permission' : (mode === 'edit' ? 'Update Permission' : PermissionModalFormConfig.title)}
                   description={PermissionModalFormConfig.description}
                   fields={PermissionModalFormConfig.fields}
                   buttons={PermissionModalFormConfig.buttons}
                   data={data}
                   setData={setData}
                   errors={errors}
                   processing={processing}
                   handleSubmit={handleSubmit}
                   open={modalOpen}
                   onOpenChange={handleModalToggle}
                   mode={mode}
                   />
                </div>

                <CustomTable 
                    columns={PermissionTableConfig.columns} 
                    actions={PermissionTableConfig.actions} 
                    data={permissions.data} 
                    from={permissions.from} 
                    onDelete={handleDelete}
                    onView={(permission) => openModal('view', permission)}
                    onEdit={(permission) => openModal('edit', permission)}
                    isModal={true}
                />

         </div>
        </AppLayout>
    );
}

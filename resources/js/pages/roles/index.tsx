
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { RoleModalFormConfig } from '@/components/config/form/role-modal-form';
import { RoleTableConfig } from '@/components/config/tables/role-table';
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
        title: 'Manage Roles',
        href: '/roles',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Role {
    id: number;
    name: string;
    description: string;
}

interface RolePagination {
    data: Role[];
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
    outlets: RolePagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}


export default function Index({ roles } : IndexProps) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedOutlet, setSelectedOutlet ] = useState<any>(null);
    const { permissions } = usePage().props;
    console.log(permissions);

    const {data, setData, errors, processing, reset, post} = useForm<{
        label: string;
        description: string;
        permissions: string[];
        _method: string;
    }>({
        label: '',
        description:'',
        permissions: [],
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

            post(route('roles.update', selectedOutlet.id), {
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

            post(route('roles.store'), {
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
                if (key == 'permissions' && Array.isArray(value)) {
                    setData('permissions', value.map((permission: any) => permission.name),
                );
                } else {
                    setData(key as keyof typeof data, value as string | null ?? '');
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
                   addButton={RoleModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View Permission' : (mode === 'edit' ? 'Update Role' : RoleModalFormConfig.title)}
                   description={RoleModalFormConfig.description}
                   fields={RoleModalFormConfig.fields}
                   buttons={RoleModalFormConfig.buttons}
                   data={data}
                   setData={setData}
                   errors={errors}
                   processing={processing}
                   handleSubmit={handleSubmit}
                   open={modalOpen}
                   onOpenChange={handleModalToggle}
                   mode={mode}
                   extraData={permissions}
                   />
                </div>

                <CustomTable 
                    columns={RoleTableConfig.columns} 
                    actions={RoleTableConfig.actions} 
                    data={roles.data} 
                    from={roles.from} 
                    onDelete={handleDelete}
                    onView={(role) => openModal('view', role)}
                    onEdit={(role) => openModal('edit', role)}
                    isModal={true}
                />
         </div>
        </AppLayout>
    );
}

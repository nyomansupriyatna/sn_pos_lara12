
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { UserModalFormConfig } from '@/components/config/form/user-modal-form';
import { UserTableConfig } from '@/components/config/tables/user-table';
import { CustomModalForm } from '@/components/custom-modal-form';
import { CustomToast, toast } from '@/components/custom-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CustomTable } from '@/components/ui/custom-table';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import password from '@/routes/password';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: '/users',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    roles: string;
}

interface UserPagination {
    data: User[];
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
    outlets: UserPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}


export default function Index({ users } : IndexProps) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedUser, setSelectedUser ] = useState<any>(null);
    const { props } = usePage();

    const {data, setData, errors, processing, reset, post} = useForm<{
        name: string;
        email: string;
        password: string;
        confirm_password: string;
        roles: string[];
        _method: string;
    }>({
        name:'',
        email: '',
        password: '',
        confirm_password: '',
        roles: [],
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
        if (mode === 'edit' && selectedUser) {

            data._method = 'PUT';

            // console.log('selectedUser--', selectedUser.id);
            // return;

            post(route('users.update', selectedUser.id), {
                forceFormData: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success;
                    successMessage && toast.success(successMessage);
                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                    const errorMessage = error.message;
                    errorMessage && toast.error(errorMessage);
                    console.log('errorMessage--', errorMessage);
                    closeModal();
                }
            });

        // create or store mode
        } else {

            // console.log('data--', data);
            // return;

            post(route('users.store'), {
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
        setSelectedUser(null);
        reset();
        setModalOpen(false);
    };

    // handle modal toggle
    const handleModalToggle = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setMode('create');
            setSelectedUser(null);
            reset();
        }
    };

    // open modal
    const openModal = (mode: 'create' | 'view' | 'edit', outlet?: any) => {
        setMode(mode);

        if (outlet) {
            Object.entries(outlet).forEach(([key, value]) => {
                if (key == 'roles' && Array.isArray(value)) {
                    setData('roles', value[0]?.name);
                } else {
                    setData(key as keyof typeof data, value as string | null ?? '');
                }
            });

            // setting image preview
            // setPreviewImage(outletoutlet.image);
            setSelectedUser(outlet);
        } else {
            // console.log(data);
        }

        setModalOpen(true);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />

            <CustomToast />

            <div className='flex h-full flex-1 flex-col rounded-xl p-4'>

                {/* custom modal form */}
                <div className='ml-auto'>
                   <CustomModalForm 
                   addButton={UserModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View User' : (mode === 'edit' ? 'Update User' : UserModalFormConfig.title)}
                   description={UserModalFormConfig.description}
                   fields={UserModalFormConfig.fields}
                   buttons={UserModalFormConfig.buttons}
                   data={data}
                   setData={setData}
                   errors={errors}
                   processing={processing}
                   handleSubmit={handleSubmit}
                   open={modalOpen}
                   onOpenChange={handleModalToggle}
                   mode={mode}
                   extraData={props}
                   />
                </div>

                <CustomTable 
                    columns={UserTableConfig.columns} 
                    actions={UserTableConfig.actions} 
                    data={users.data} 
                    from={users.from} 
                    onDelete={handleDelete}
                    onView={(user) => openModal('view', user)}
                    onEdit={(user) => openModal('edit', user)}
                    isModal={true}
                />
         </div>
        </AppLayout>
    );
}

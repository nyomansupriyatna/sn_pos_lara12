
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


export default function Index({ users, totalCount, filteredCount } : IndexProps) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedUser, setSelectedUser ] = useState<any>(null);
    const { props } = usePage();

    // console.log('props->', props);

    // const {data, setData, errors, processing, reset, post} = useForm<{
    //     name: string;
    //     email: string;
    //     password: string;
    //     confirm_password: string;
    //     roles: string[];
    //     _method: string;
    // }>({
    //     name:'',
    //     email: '',
    //     password: '',
    //     confirm_password: '',
    //     roles: [],
    //     _method: 'POST'
    // });

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

        router.get(route('users.index'), queryString, {
            preserveState: true,
            preserveScroll: true,

        })

    }

    // reset search
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.get(route('users.index'), {}, {
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
                const successMessage = response.props.flash?.success;
                   successMessage && toast.success(successMessage);

                    closeModal();
                },
                 onError: (error: Record<string, string>) => {
                     const errorMessage = error.message;
                     errorMessage && toast.error(errorMessage);
    
                }
            });
        }
    }

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault();

        if (mode === 'edit' && selectedUser) {

            data._method = 'PUT';

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
            // setPreviewImage(outlet.image);
            setSelectedUser(outlet);
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
            <Head title="User" />

            <CustomToast />

            <div className='flex h-full flex-1 flex-col rounded-xl p-4'>

                {/* custom modal form */}
                <div className='ml-auto w-full'>
                   <CustomModalForm 
                   addButton={UserModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View User' : (mode === 'edit' ? 'Update User' : UserModalFormConfig.title)}
                   description={UserModalFormConfig.description}
                   fields={UserModalFormConfig.fields}
                   search_label={UserModalFormConfig.search_label}
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
                   handleSearch={handleSearch}
                   handleReset={handleReset}
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

                 <Pagination 
                    sumber={users} 
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

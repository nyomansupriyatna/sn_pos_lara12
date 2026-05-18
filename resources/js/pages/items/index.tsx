import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
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
import { ItemTableConfig } from '@/components/config/tables/item-table';
import { ItemModalFormConfig } from '@/components/config/form/item-modal-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: '/items',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface dataRecord {
    outlet_id:number;
    outlet_name:string;
    group_id:number;
    group_name:string;
    baris_id:number;
    baris_name:string;
    portion_id:number;
    portion_name:string;
    name:string;
    descripton:string;
    currency_id:number;
    currency_name:string;
    price:number;
    happy_hour_price:number;
    cost_percentage:number;
    recipe_code:string;
    printer_kitchen_list:string;
    image_path:string;
    favorite:boolean;
    active:boolean;
}

interface dataPagination {
    data: dataRecord[];
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
    datasources: dataPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

export default function Index({datasources, totalCount, filteredCount, filters  } : IndexProps) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ mode, setMode ] = useState<'create' | 'view' | 'edit'>('create');
    const [ selectedRow, setSelectedRow ] = useState<any>(null);
    const [ previewImage, setPreviewImage ] = useState<string | null>(null);
    const { props } = usePage();

    const { data, setData, errors, processing, reset, post } = useForm ({
        search: '',
        perPage: '10',
        outlet_id: '',
        group_id: '0',
        portion_id: '',
        name: '',
        description: '',
        currency_id: '',
        price: '',
        happy_hour_price: '',
        cost_percentage: '',
        recipe_code: '',
        printer_kitchen_list: '',
        image_path: '',
        favorite: '',
        active: '',
    });

    // console.log('datasources-->', datasources);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString =  {
            ...(value && {search: value}),
            ...(data.perPage && {perPage: data.perPage}),
            ...(data.group_id && {group_id: data.group_id}),
        }

        router.get(route('items.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    // reset search
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');
        setData('group_id', '0');

        router.get(route('items.index'), {}, {
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
                const successMessage = response.props.flash?.success || 'Record deleted successfully'
                    toast.success(successMessage);

                    closeModal();
                },
                 onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to delete record'
                     toast.error(errorMessage);
    
                }
            });
            // toast.success(flashMessage);
        }
    }

    const handleSubmit = (e: React.ChangeEvent) => {
        e.preventDefault();

        // edit mode
        if (mode === 'edit' && selectedRow) {

            data._method = 'PUT';

            post(route('items.update', selectedRow.id), {
                forceFormData: true,
                onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Record updated successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to updated record'
                     toast.error(errorMessage);
    
                }
            });

        // create mode
        } else {
            post(route('items.store'), {
               onSuccess: (response: {props: FlashProps}) => {
                const successMessage = response.props.flash?.success || 'Record created successfully'
                   toast.success(successMessage);

                    closeModal();
                },
                onError: (error: Record<string, string>) => {
                     const errorMessage = error.message || 'Failed to create record'
                     toast.error(errorMessage);
                }
            });
        }
        
    }

// closing modal
    const closeModal = () => {
        setMode('create');
        setPreviewImage(null);
        setSelectedRow(null);
        reset();
        setModalOpen(false);
    };

    // handle modal toggle
    const handleModalToggle = (open: boolean) => {
        setModalOpen(open);
        if (!open) {
            setMode('create');
            setPreviewImage(null);
            setSelectedRow(null);
            reset();
            handleReset(); //ok
        }
    };


    // open modal
    const openModal = (mode: 'create' | 'view' | 'edit', baris?: any) => {
        setMode(mode);

        if (baris) {
            Object.entries(baris).forEach(([key, value]) => {
                if (key !== 'image') {
                    setData(key as keyof typeof data, value as string | null);
                }
            });

            // setting image preview
            setPreviewImage(baris.image);
            setSelectedRow(baris);
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
            ...(data.group_id && {group_id: data.group_id}),
        }

        // kirim querystring perpage to serverside php
        router.get(route('items.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        })

    }

    const handleGroupChange = (value: string) => {
        setData('group_id', value);

        const queryString =  {
            ...(data.search && {search: data.search}),
            ...(data.perPage && {perPage: data.perPage}),
            ...(value && {group_id: value}),
        }

        // kirim querystring perpage to serverside php
        router.get(route('items.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        })

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Row" />

            <CustomToast />

            <div className='flex h-full flex-1 flex-col rounded-xl p-4'>
                
                {/* custom modal form */}
                <div className='ml-auto w-full'>
                   <CustomModalForm 
                   addButton={ItemModalFormConfig.addButton}
                   title ={mode === 'view' ? 'View Row' : (mode === 'edit' ? 'Update Row' : ItemModalFormConfig.title)}
                   description={ItemModalFormConfig.description}
                   fields={ItemModalFormConfig.fields}
                   buttons={ItemModalFormConfig.buttons}
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
                   handleGroupChange={handleGroupChange}
                   />
                </div> 

                <CustomTable 
                    columns={ItemTableConfig.columns} 
                    actions={ItemTableConfig.actions} 
                    data={datasources.data} 
                    from={datasources.from} 
                    onDelete={handleDelete}
                    onView={(baris) => openModal('view', baris)}
                    onEdit={(baris) => openModal('edit', baris)}
                    isModal={true}
                />

                <Pagination 
                    sumber={datasources} 
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

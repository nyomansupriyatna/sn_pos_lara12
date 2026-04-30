
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';
import { PropertyTableConfig } from '@/components/config/tables/property-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CustomTable } from '@/components/ui/custom-table';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Property',
        href: '/properties',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}

interface Property {
    id: number;
    name: string;
    category: string;
    address: string;
    city: string;
    contact: string;
    phone: string;
    email: string;
    logo: string;
}

interface PropertyPagination {
    data: Property[];
    links: LinkProps;
    from: number;
    to: number;
    total: number;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface IndexProps {
    properties: PropertyPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}


export default function Index({properties, filters, totalCount, filteredCount}: IndexProps ) {
   
    // console.log(filters);
    // const { properties }  = props;
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState(flashMessage ? true : false);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    },[flashMessage]);

    const { data, setData } = useForm ({
        search: filters.search || '',
        perPage: filters.perPage || '10',
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString =  {
            ...(value && {search: value}),
            ...(data.perPage && {perPage: data.perPage}),
        }

        router.get(route('properties.index'), queryString, {
            preserveState: true,
            preserveScroll: true,

        })

    }

    // reset search
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');

        router.get(route('properties.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handlePerPageCange = (value: string) => {
        // console.log(value)
        setData('perPage', value);

        const queryString =  {
            ...(data.search && {search: data.search}),
            ...(value && {perPage: value}),
        }

        // kirim querystring perpage to serverside php
        router.get(route('properties.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        })

    }

    // handle delete
    const handleDelete = (id: number, route: string) => {
        if (confirm('Are you sure, you want to delete?')) {
            router.delete(route, {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className='flex h-full flex-1 flex-col rounded-xl p-4'>
                <Head title="Property" />

                {showAlert && flashMessage && (
                    <Alert 
                        variant={'default'} 
                        className={`${flash?.success ? 'bg-simpan' : (flash?.error ? 'bg-hapus' : '')} ml-auto max-w-md text-white`}>
                        <AlertDescription className='text-white'>
                            {flash.success ? 'Success!' : 'Error!'} {' '}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}

                <div className='mb-4 flex w-full items-center justify-between gap-2'>
                    {/* search button */}
                    <Input type="text" value={data.search} onChange={handleSearch} className="h-10 w-1/2" placeholder="Search Property..." name="search"/>

                    <Button onClick={handleReset} className='h-10 cursor-pointer bg-red-600 hover:bg-red-500'>
                        <X size={20} />
                    </Button>
                    {/* add property button*/}
                    <div className="ml-auto flex gap-2">
                        <Link 
                            as='button' 
                            href={route('properties.create')}
                            className='flex gap-2 bg-tambah rounded-lg p-2 text-white hover:opacity-90'
                            >
                            <CirclePlusIcon/>
                            Create Property
                        </Link>
                    </div>
                </div>

                <CustomTable columns={PropertyTableConfig.columns} actions={PropertyTableConfig.actions} data={properties.data} from={properties.from} onDelete={handleDelete}/>

                <Pagination sumber={properties} perPage={data.perPage} onPerPageChange={handlePerPageCange} totalCount={totalCount} filteredCount={filteredCount} search={data.search} />

            </div>
        </AppLayout>
    );
}

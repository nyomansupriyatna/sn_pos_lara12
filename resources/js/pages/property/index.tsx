
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
import { Card } from '@/components/ui/card';


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


interface IndexProps {
    properties: PropertyPagination;

}


export default function Index({ datasources }: IndexProps ) {
    const { flash } = usePage<{flash?: {success?: string; error?: string} }>().props ;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState(flashMessage ? true : false);


    const { data, setData } = useForm ({
        name: '',
        category: '',
        address: '',
        city: '',
        contact: '',
        phone: '',
        email: '',
        logo: '',
        search: '',
        perPage: '',
    });

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

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ------------------------- */}
            <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-300">
                <div className="bg-blue-500 h-24 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">
                        {datasources.name}
                    </span>
                </div>

                <p className="text-gray-600 mb-4 mt-2 flex justify-center font-extrabold text-xl">
                    {datasources.category}
                </p>
                <div className="p-6">

                    <div className="space-y-2 text-sm">
                        <p>Alamat 📍 : {datasources.address}</p>
                        <p>Kota : {datasources.city}</p>
                        <p>Phone 📞 : {datasources.phone}</p>
                        <p>Contact : {datasources.contact}</p>
                        <p>Email 📧 : {datasources.email}</p>
                        <p>logo: {datasources.logo}</p>
                    </div>
                </div>
            </div>

            {/* ------------------------------ */}
                </div>
            </div>
        </AppLayout>
    );
}

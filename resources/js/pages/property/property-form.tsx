
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save   } from 'lucide-react';
import { useState } from 'react';
// import { route } from 'ziggy-js';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
// import properties from '@/routes/properties';


export default function PropertyForm({...props}) {

    const {property, isView, isEdit } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' : (isEdit ? 'Update' : 'Create')} Property`,
            href: '/properties/create',
        },
    ];

    const {data, setData, post, processing, errors, reset} =  useForm({
        name: property?.name || '',
        category: property?.category || '',
        address: property?.address || '',
        city: property?.city || '',
        contact: property?.contact || '',
        phone: property?.phone || '',
        email: property?.email || '',
        filelogo: null as File | null,
        _method: isEdit? 'put' : 'post'
    });

    const submit = (e: React.SubmitEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if (isEdit) {
            // post(`/properties/${property.id}`, {
            //     onSuccess:()=>reset(),
            // });
            post(route('properties.update', property.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            })
        } else {
            // post('/properties',{
            //      onSuccess:()=>reset()
            // })
            post(route('properties.store'), {
                onSuccess: () => reset(),
            })
        }
       
    }

    const [preview, setPreview] = useState<string | null>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) =>{
        // console.log('e.target.file: '+e.target.files);
        const file = e.target.files?.[0]
      
        if (file) {
                
            setData('filelogo', file); 
            setPreview(URL.createObjectURL(file))
        }
    }
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Property" />
             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-scroll">
                <div className='ml-auto'>
                    <Link 
                        href={route('properties.index')}
                        className="flex gap-2 w-fit not-only-of-type:text-md cursor-pointer rounded-lg bg-kembali px-4 py-2 text-white hover:opacity-90"
                    >
                      <ArrowLeft/>
                        Back 
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                             {isView ? 'Show' : (isEdit ? 'Update' : 'Create')} Property
                            </CardTitle>

                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className='flex flex-col gap-4' autoComplete='off'>
                            
                            <div className="grid gap-6">
                                {/* property name */}
                                <div className="grid gap-2">
                                    <Label htmlFor='name'>Property Name *</Label>
                                    <Input 
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    id='name' 
                                    name='name' 
                                    type='text' 
                                    autoFocus 
                                    tabIndex={1}
                                    disabled={isView || processing}
                                    placeholder='Property Name'/>
                                    <InputError message={errors.name} />
                                </div>
                                {/* property category */}
                                <div className="grid gap-2">
                                    <Label htmlFor='category'>Property Category *</Label>
                                    <Input 
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    id='category' 
                                    name='category' 
                                    type='text' 
                                    autoFocus 
                                    tabIndex={2}
                                    disabled={isView || processing}
                                    placeholder='Property Category'/>
                                    <InputError message={errors.category} />
                                </div>
                                {/* property address */}
                                <div className="grid gap-2">
                                    <Label htmlFor='address'>Property Address *</Label>
                                    <CustomTextarea 
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)} 
                                    id="address"
                                    name="address"
                                    tabIndex={3}
                                    disabled={isView || processing}
                                    placeholder="Property Address"
                                    rows={3}
                                    />
                                    <InputError message={errors.address} />
                                </div>
                                 {/* property city */}
                                <div className="grid gap-2">
                                    <Label htmlFor='city'>Property City *</Label>
                                    <Input 
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    id='city' 
                                    name='city' 
                                    type='text' 
                                    autoFocus 
                                    tabIndex={4}
                                    disabled={isView || processing}
                                    placeholder='Property City'/>
                                    <InputError message={errors.city} />
                                </div>
                                 {/* property Contact Person */}
                                <div className="grid gap-2">
                                    <Label htmlFor='contact'>Contact Person</Label>
                                    <Input 
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                    id='contact' 
                                    name='contact' 
                                    type='text' 
                                    autoFocus 
                                    tabIndex={5}
                                    disabled={isView || processing}
                                    placeholder='Contact Person'/>
                                    <InputError message={errors.contact} />
                                </div>
                                 {/* property Phone */}
                                <div className="grid gap-2">
                                    <Label htmlFor='phone'>Phone</Label>
                                    <Input 
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    id='phone' 
                                    name='phone' 
                                    type='text' 
                                    autoFocus 
                                    tabIndex={6}
                                    disabled={isView || processing}
                                    placeholder='Phone'/>
                                    <InputError message={errors.phone} />
                                </div>
                                 {/* property email */}
                                <div className="grid gap-2">
                                    <Label htmlFor='email'>Email</Label>
                                    <Input id='email' 
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    name='email' 
                                    type='email' 
                                    placeholder='Email' 
                                    autoFocus 
                                    tabIndex={7}
                                    disabled={isView || processing}
                                     />
                                    <InputError message={errors.email} />
                                </div>

                                 {/* property file jpeg,jpg,png,gif logo */}
                                 {!isView && (
                                    <div className="grid gap-2">
                                        <Label htmlFor='filelogo'>Property Logo</Label>
                                        <Input 
                                        onChange={handleFileUpload}
                                        id='filelogo' 
                                        name='filelogo' 
                                        type='file' 
                                        autoFocus 
                                        tabIndex={8}
                                        />
                                        <InputError message={errors.filelogo} />
                                    </div>
                                 )}
                                 
                                 {(isView) && (
                                    <div className="grid gap-2">
                                        <Label htmlFor='logo'>Property Logo</Label>
                                        <img src={`/storage/${property.logo}`}  alt="logo" className='w-50 h-40 rounded-lg border object-cover' />
                                    </div>

                                 )}
                                 {(isEdit) && (
                                    <div className="mt-4">
                                        {preview && (
                                            <img
                                                src={preview}
                                                className="w-50 h-40 object-cover rounded-lg shadow"
                                            />
                                        )}
                                        {!preview && (
                                            <img src={`/storage/${property.logo}`}  alt="logo" className='w-50 h-40 rounded-lg border object-cover' />
                                        )}
                                    </div>
                                 )}

                                <div className='flex flex-1 gap-4'>
                                    {!isView && (
                                        <Button
                                            variant={'simpan'}
                                            type="submit"
                                            className="flex gap-2 w-fit not-only-of-type:text-md cursor-pointer rounded-lg px-4 py-2 hover:opacity-90"
                                            tabIndex={9}
                                        >
                                            {processing && <LoaderCircle className='h-4 w-4 animmasi-spin' />}

                                            <Save /> 
                                            {processing ? (isEdit ? 'Updating...' : 'Creating...'): isEdit ? 'Update' : 'Save'} Property
                                        </Button>
                                    )}
                                   
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
             </div>
        </AppLayout>
    );
}



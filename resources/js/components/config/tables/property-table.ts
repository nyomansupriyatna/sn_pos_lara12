export const PropertyTableConfig = {
    columns: [
        { label: 'Property Name', key: 'name', className: 'border p-4' },
        { label: 'Category', key: 'category' },
        { label: 'Address', key: 'address', className: 'w-90 border p-4' },
        { label: 'City', key: 'city', className: 'border p-4' },
        { label: 'Contact', key: 'contact', className: 'border p-4' },
        { label: 'phone', key: 'phone', className: 'border p-4' },
        { label: 'Email', key: 'email', className: 'border p-4' },
        { label: 'Logo', key: 'logo', isImage: true, className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', route: 'properties.show', className: 'bg-show text-white rounded-lg p-2 cursor-pointer' },
        { label: 'Edit', icon: 'Pencil', route: 'properties.edit', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer' },
        { label: 'Delete', icon: 'Trash2', route: 'properties.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer' },
    ]
}
export const OutletTableConfig = {
    columns: [
        { label: 'Outlet Name', key: 'outlet', className: 'border p-4' },
        { label: 'Service', key: 'service' },
        { label: 'Tax', key: 'tax', className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', route: 'outlets.show', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-outlet' },
        { label: 'Edit', icon: 'Pencil', route: 'outlets.edit', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-outlet' },
        { label: 'Delete', icon: 'Trash2', route: 'outlets.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-outlet' },
    ]
}
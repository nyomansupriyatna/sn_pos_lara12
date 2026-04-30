export const PermissionTableConfig = {
    columns: [
        { label: 'Permission Label', key: 'label', className: 'border p-4' },
        { label: 'Module', key: 'module', className: 'capitalize border p-4' },
        { label: 'Description', key: 'description', className: 'w-90 border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-permission' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-permission' },
        { label: 'Delete', icon: 'Trash2', route: 'permissions.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-permission' },
    ]
}
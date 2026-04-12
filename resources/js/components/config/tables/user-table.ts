export const UserTableConfig = {
    columns: [
        { label: 'User Name', key: 'name', className: 'border p-4' },
        { label: 'Email', key: 'email', className: 'w-90 border p-4' },
        { label: 'Roles', key: 'roles', className: 'border p-4', type: 'multi-values' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-user' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-user' },
        { label: 'Delete', icon: 'Trash2', route: 'users.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-user' },
    ]
}
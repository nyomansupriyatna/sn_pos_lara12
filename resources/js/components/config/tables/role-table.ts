export const RoleTableConfig = {
    columns: [
        { label: 'Role Name', key: 'label', className: 'border p-4' },
        { label: 'Description', key: 'description', className: 'w-90 border p-4' },
        { label: 'Permission', key: 'permissions', className: 'border p-4', type: 'multi-values' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-role' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-role' },
        { label: 'Delete', icon: 'Trash2', route: 'roles.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-role' },
    ]
}
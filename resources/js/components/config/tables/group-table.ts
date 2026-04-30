export const GroupTableConfig = {
    columns: [
        { label: 'Group Name', key: 'name', className: 'border p-4' },
        { label: 'Description', key: 'description' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-group' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-group' },
        { label: 'Delete', icon: 'Trash2', route: 'groups.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-group' },
    ]
}
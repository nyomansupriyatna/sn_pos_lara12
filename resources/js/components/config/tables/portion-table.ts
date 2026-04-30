export const PortionTableConfig = {
    columns: [
        { label: 'Portion Name', key: 'name', className: 'border p-4' },
        { label: 'Description', key: 'description', className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-portion' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-portion' },
        { label: 'Delete', icon: 'Trash2', route: 'portions.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-portion' },
    ]
}
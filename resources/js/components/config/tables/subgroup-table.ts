export const SubgroupTableConfig = {
    columns: [
        { label: 'Group Name', key: 'group_name', className: 'border p-4' },
        { label: 'Sub Group Name', key: 'name', className: 'border p-4' },
        { label: 'Description', key: 'description' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-subgroup' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-subgroup' },
        { label: 'Delete', icon: 'Trash2', route: 'subgroups.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-subgroup' },
    ]
}
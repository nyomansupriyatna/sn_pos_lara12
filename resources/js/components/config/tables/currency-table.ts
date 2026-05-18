export const CurrencyTableConfig = {
    columns: [
        { label: 'Currency Name', key: 'name', className: 'border p-4' },
        { label: 'Exchange Rate', key: 'exc_rate', className: 'border p-4' },
        { label: 'Description', key: 'description', className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-currency' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-currency' },
        { label: 'Delete', icon: 'Trash2', route: 'currencies.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-currency' },
    ]
}
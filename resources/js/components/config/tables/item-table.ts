export const ItemTableConfig = {
    columns: [
        { label: 'Outlet Name', key: 'outlet_name', className: 'border p-4' },
        { label: 'Group Name', key: 'group_name', className: 'border p-4' },
        { label: 'Sub Group', key: 'subgroup_name', className: 'border p-4' },
        { label: 'Portion', key: 'portion_name', className: 'border p-4' },
        { label: 'Item Name', key: 'name', className: 'border p-4' },
        { label: 'Descriptions', key: 'description', className: 'border p-4' },
        { label: 'Currency', key: 'currency_name', className: 'border p-4' },
        { label: 'Price', key: 'price', className: 'border p-4' },
        { label: 'Happy Hour Price', key: 'happy_hour_price', className: 'border p-4' },
        { label: 'Cost Percentage', key: 'cost_percentage', className: 'border p-4' },
        { label: 'Recipe Code', key: 'recipe_code', className: 'border p-4' },
        // { label: 'Kitchen Printers', key: 'printer_kitchen_list', className: 'border p-4' },
        { label: 'Image', key: 'image_path', className: 'border p-4' },
        // { label: 'Favorite', key: 'favorite', className: 'border p-4' },
        // { label: 'Active', key: 'active', className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'sticky right-0 z-10 bg-gray-200 text-gray-700 border border-1 border-gray-300 p-4' }
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-show text-white rounded-lg p-2 cursor-pointer', permission: 'view-item' },
        { label: 'Edit', icon: 'Pencil', className: 'bg-edit text-white rounded-xl p-2 cursor-pointer', permission: 'edit-item' },
        { label: 'Delete', icon: 'Trash2', route: 'items.destroy', className: 'bg-hapus rounded-xl text-white p-2 cursor-pointer', permission: 'delete-item' },
    ]
}
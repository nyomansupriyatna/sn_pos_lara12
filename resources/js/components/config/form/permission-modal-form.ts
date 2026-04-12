import { CirclePlus } from "lucide-react";

export const PermissionModalFormConfig = {
    moduleTitle: 'Manage Permission',
    title: 'Create Permission',
    description: 'Fill in details below to create a new permissions.',
    addButton: {
        id: 'add-permission',
        label: 'Add Permission',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-permission',
    },
    fields: [
        {
            id: 'module',
            key: 'module',
            name: 'module',
            label: 'Module Name',
            type: 'single-select',
            tabIndex: 1,
            autoFocus: true,
            options: [
                { label: 'Outlets', value: 'outlets', key: 'outlets' },
                { label: 'Properties', value: 'properties', key: 'properties' },
                { label: 'Users', value: 'users', key: 'users' },
                { label: 'Permissions', value: 'permissions', key: 'permissions' },
                { label: 'Roles', value: 'roles', key: 'roles' },
            ]
        },
        {
            id: 'permission-label',
            key: 'label',
            name: 'label',
            label: 'Permission Label (ex. Create User)',
            type: 'text',
            placeholder: 'Enter permission label',
            autocomplete: 'label',
            tabIndex: 2,
        },
        {
            id: 'description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            className: 'border rounded-md px-2',
            placeholder: 'Enter permission description',
            autocomplete: 'description',
            tabIndex: 3,
            rows: 2,
            autoFocus: true,
        }
    ],
    buttons: [
        {
            key: 'cancel',
            type: 'button',
            label: 'Cancel',
            variant: 'ghost',
            className: 'bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400 cursor-pointer',
        },
        {
            key: 'submit',
            type: 'submit',
            label: 'Save Permission',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],
}
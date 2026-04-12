import { CirclePlus } from "lucide-react";

export const RoleModalFormConfig = {
    moduleTitle: 'Manage Role',
    title: 'Create Role',
    description: 'Fill in details below to create a new roles.',
    addButton: {
        id: 'add-role',
        label: 'Add Role',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-role',
    },
    fields: [
        {
            id: 'role-label',
            key: 'label',
            name: 'label',
            label: 'Role Label (ex. Super Admin)',
            type: 'text',
            placeholder: 'Enter role label',
            autocomplete: 'label',
            tabIndex: 1,
        },
        {
            id: 'description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            className: 'border rounded-md px-2',
            placeholder: 'Enter role description',
            autocomplete: 'description',
            tabIndex: 2,
            rows: 2,
            autoFocus: true,
        },
        {
            id: 'permissions',
            key: 'permissions',
            name: 'permissions[]',
            label: 'Permissions',
            type: 'grouped-checkboxes',
            tabIndex: 3,
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
            label: 'Save Role',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],


}
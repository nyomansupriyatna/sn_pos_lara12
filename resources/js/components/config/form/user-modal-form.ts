import { CirclePlus } from "lucide-react";

export const UserModalFormConfig = {
    moduleTitle: 'Manage User',
    title: 'Create User',
    search_label: 'Search User Name....',
    description: 'Fill in details below to create a new users.',
    addButton: {
        id: 'add-user',
        label: 'Add User',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-user',
    },
    fields: [
        {
            id: 'full-name',
            key: 'name',
            name: 'name',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Enter Full Name',
            autocomplete: 'name',
            tabIndex: 1,
        },
        {
            id: 'email',
            key: 'email',
            name: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Enter your email',
            autocomplete: 'email',
            tabIndex: 2,
        },
        {
            id: 'password',
            key: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            autocomplete: 'password',
            tabIndex: 3,
        },
        {
            id: 'confirm-password',
            key: 'confirm_password',
            name: 'confirm_password',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm your password',
            autocomplete: 'confirm_password',
            tabIndex: 4,
        },
        {
            id: 'roles',
            key: 'roles',
            name: 'roles',
            label: 'Role Name',
            type: 'single-select',
            tabIndex: 5,
            autoFocus: true,
            options: []
        },
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
            label: 'Save',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],


}
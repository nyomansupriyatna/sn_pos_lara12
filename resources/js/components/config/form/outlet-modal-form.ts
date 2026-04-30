import { CirclePlus } from "lucide-react";

export const OutletModalFormConfig = {
    moduleTitle: 'Manage Outlet',
    title: 'Create Outlet',
    description: 'Fill in details below to create a new outlets.',
    addButton: {
        id: 'add-outlet',
        label: 'Add Outlet',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-outlet',
    },
    fields: [
        {
            id: 'outlet-name',
            key: 'outlet',
            name: 'outlet',
            label: 'Outlet Name',
            type: 'text',
            placeholder: 'Enter outlet name',
            autocomplete: 'outlet',
            tabIndex: 1,
            autoFocus: true,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'outlet-service',
            key: 'service',
            name: 'service',
            label: 'Service %',
            type: 'number',
            placeholder: 'Enter Service %',
            autocomplete: 'service',
            tabIndex: 2,
            autoFocus: true,
        },
        {
            id: 'outlet-tax',
            key: 'tax',
            name: 'tax',
            label: 'Tax %',
            type: 'text',
            placeholder: 'Enter Tax %',
            autocomplete: 'tax',
            tabIndex: 3,
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
            label: 'Save',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],


}
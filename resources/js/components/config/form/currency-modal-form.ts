import { CirclePlus } from "lucide-react";

export const CurrencyModalFormConfig = {
    moduleTitle: 'Manage Currency',
    title: 'Create Currency',
    description: 'Fill in details below to create a new currency.',
    addButton: {
        id: 'add-currency',
        label: 'Add',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-currency',
    },
    fields: [
        {
            id: 'currency',
            key: 'currency',
            name: 'currency',
            label: 'Currency Name',
            type: 'text',
            placeholder: 'Enter Currency Name',
            autocomplete: 'currency',
            tabIndex: 1,
        },
        {
            id: 'exc_rate',
            key: 'exc_rate',
            name: 'exc_rate',
            label: 'Exchange Rate',
            type: 'text',
            className: 'border rounded-md px-2',
            placeholder: 'Enter Exchange Rate',
            autocomplete: 'exc_rate',
            tabIndex: 2,
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
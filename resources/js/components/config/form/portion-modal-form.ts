import { CirclePlus } from "lucide-react";

export const PortionModalFormConfig = {
    moduleTitle: 'Manage Portion',
    title: 'Create Portion',
    description: 'Fill in details below to create a new permissions.',
    addButton: {
        id: 'add-portions',
        label: 'Add',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-portion',
    },
    fields: [
        {
            id: 'portion-name',
            key: 'name',
            name: 'name',
            label: 'Portion Name',
            type: 'text',
            placeholder: 'Enter Portion Name',
            autocomplete: 'name',
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
            label: 'Save',
            variant: 'default',
            className: 'cursor-pointer',
        },
    ],
}
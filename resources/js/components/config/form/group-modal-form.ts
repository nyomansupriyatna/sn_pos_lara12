import { CirclePlus } from "lucide-react";

export const GroupModalFormConfig = {
    moduleTitle: 'Manage Group',
    title: 'Create Group',
    description: 'Fill in details below to create a new groups.',
    addButton: {
        id: 'add-group',
        label: 'Add Group',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-group',
    },
    fields: [
        {
            id: 'group-name',
            key: 'name',
            name: 'name',
            label: 'Group Name',
            type: 'text',
            placeholder: 'Enter group name',
            autocomplete: 'group',
            tabIndex: 1,
            autoFocus: true,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'group-description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter Description',
            autocomplete: 'description',
            tabIndex: 2,
            autoFocus: true,
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
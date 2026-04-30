import { CirclePlus } from "lucide-react";

export const SubgroupModalFormConfig = {
    moduleTitle: 'Manage Sub Group',
    title: 'Create Sub Group',
    description: 'Fill in details below to create a new sub subgroups.',
    addButton: {
        id: 'add-subgroup',
        label: 'Add',
        className: 'bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-indigo-800 cursor-pointer',
        icon: CirclePlus,
        type: 'button',
        variant: 'default',
        permission: 'create-subgroup',
    },
    fields: [
        {
            id: 'group_name',
            key: 'group_name',
            name: 'group_name',
            label: 'Group Name',
            type: 'single-select2',
            autocomplete: 'group_name',
            tabIndex: 1,
            autoFocus: true,
            options: []
        },
        {
            id: 'subgroup-name',
            key: 'name',
            name: 'name',
            label: 'Sub Group Name',
            type: 'text',
            placeholder: 'Enter subgroup name',
            autocomplete: 'subgroup',
            tabIndex: 2,
            autoFocus: true,
            className: 'rounded border p-2 w-full',
        },
        {
            id: 'subgroup-description',
            key: 'description',
            name: 'description',
            label: 'Description',
            type: 'text',
            placeholder: 'Enter Description',
            autocomplete: 'description',
            tabIndex: 3,
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
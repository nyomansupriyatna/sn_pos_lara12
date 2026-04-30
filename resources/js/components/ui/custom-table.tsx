import { Link, usePage } from "@inertiajs/react";
import * as LucidIcons from "lucide-react";
import { hasPermission } from "@/utils/authorization";
import { Badge } from "./badge";
import { Button } from "./button";

interface TableColumn {
    label: string;
    key: string;
    isImage?: boolean;
    isAction?: boolean;
    className?: string;
    type?: string;
}
interface ActionConfig {
    label: string;
    icon: keyof typeof LucidIcons;
    route: string;
    className: string;
    permission?: string;
}

interface TableRow {
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[];
    actions: ActionConfig[];
    data: TableRow[];
    from: number;
    onDelete: (id: number, route: string) => void;
    onView: (row: TableRow) => void;
    onEdit: (row: TableRow) => void;
    isModal?: boolean;
}

export const CustomTable = ({ columns, actions, data, from, onDelete, onView, onEdit, isModal }: CustomTableProps) => {

    // console.log('onEdit-->', onEdit);

    const { auth } = usePage().props as any;
    const roles = auth.roles;
    const permissions = auth.permissions;

    const renderActionButtons = (row: TableRow) => {
        return (
            <div className="flex gap-2 items-center justify-center">
                { actions.map((action, index) => {

                    if (action.permission && !hasPermission(permissions, action.permission)) {
                        return null;
                    }

                    const IconComponent = LucidIcons[action.icon] as React.ElementType;

                    if (isModal) {
                        if (action.label === 'View') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onView?.(row)} >
                                    <IconComponent size={18} />
                                </Button>
                            )
                        }
                        
                        if (action.label === 'Edit') {
                            return (
                                <Button key={index} className={action.className} onClick={() => onEdit?.(row)} >
                                    <IconComponent size={18} />
                                </Button>
                            )
                        }
                    }

                    // delete functionality
                    if (action.label === 'Delete') {
                        return (
                            <Button key={index} className={action.className} onClick={() => onDelete(route(action.route, row.id))}>
                                <IconComponent size={18} />
                            </Button>
                        )
                    }
                    return (
                    <Link key={index} as='button' href={route(action.route, row.id)} className={action.className}>
                        <IconComponent size={18} />
                    </Link>
                    )
                })}
            </div>
        )
    }

    // console.log('data table->', data)

    return (
         <div className="m-2 overflow-scroll border rounded-md">
            <table className="w-[calc(100vw-360px)] overflow-scroll">
                <thead className='bg-gray-700 border '>
                    <tr className="bg-gray-700 text-white">
                        <th className='border p-4'>#</th>

                        {columns.map((column, index) => (
                            <th key={column.key} className={column.className} >{column.label} </th>
                        ))}
                     
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 text-center">{from + index}</td>

                            {columns.map((col) => (
                                <td key={col.key} className={`border px-4 py-2 text-center ${col.className}`}>
                                { col.isImage ? (
                                    <div>
                                        <img src={`/storage/${row[col.key]}`} alt={row.name || 'Image'} className='h-16 w-20 object-cover' />
                                    </div>
                                ) : col.isAction ? ( 
                                    renderActionButtons(row) 
                                ) : col.type === 'multi-values' && Array.isArray(row[col.key]) ? (
                                    <div className="flex items-center gap-1 justify-center flex-wrap">
                                        {row[col.key].map((permission: string) => (
                                            <Badge className="bg-indigo-100 text-indigo-700 px-3 py-0.5" key={permission.id} variant='outline'>{permission.label || permission.name}</Badge>
                                        ))}
                                    </div>
                                ) : (
                                    row[col.key]
                                )}
                                </td>
                            ))}
                        </tr>
                    ))
                    ):(
                        <tr>
                            <td colSpan={11} >
                                <div className='flex justify-center items-center p-2 font-bold text-red-500'>No Data Found!</div>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    );
}
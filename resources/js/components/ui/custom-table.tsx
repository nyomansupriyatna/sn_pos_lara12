import { Link } from "@inertiajs/react";
import * as LucidIcons from "lucide-react";
import { Button } from "./button";

interface TableColumn {
    label: string;
    key: string;
    isImage?: boolean;
    isAction?: boolean;
    className?: string;
}
interface ActionConfig {
    label: string;
    icon: keyof typeof LucidIcons;
    route: string;
    className: string;
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
}

export const CustomTable = ({ columns, actions, data, from, onDelete }: CustomTableProps) => {

    // console.log('Action-->', actions);

    const renderActionButtons = (row: TableRow) => {
        return (
            <div className="flex gap-2">
                { actions.map((action, index) => {
                    const IconComponent = LucidIcons[action.icon] as React.ElementType;

                    // delete functionality
                    if (action.label === 'Delete') {
                        return (
                            <Button key={index} className={action.className} onClick={() => onDelete(row.id, route(action.route, row.id))}>
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

    return (
         <div className="m-2 overflow-scroll border rounded-md">
            <table className="w-[calc(100vw-220px)] overflow-scroll">
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
                                <td className="border px-4 py-2 text-center">
                                { col.isImage ? (
                                    <div>
                                        <img src={`/storage/${row[col.key]}`} alt={row.name || 'Image'} className='h-16 w-20 object-cover' />
                                    </div>
                                ) : col.isAction ? ( 
                                    renderActionButtons(row) 
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
                                <div className='flex justify-center items-center p-2 font-bold text-red-500'>No Record Found!</div>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    );
}
import { Link } from "@inertiajs/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import properties from "@/routes/properties";

interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
}

interface PaginationData {
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface PaginationProps {
    properties : PaginationData;
    perPage: string;
    onPerPageChange: (value: string) => void;
    totalCount: number;
    filteredCount: number;
    search: string;
    sumber: PaginationData;
}

export const Pagination = ({ sumber, perPage, onPerPageChange, totalCount, filteredCount, search } : PaginationProps) => {
    
    console.log(totalCount, filteredCount, search);

    return (
        <div className="flex items-center justify-between mt-2">
            
            {/* pagination information */}

            {/* select per page */}
            {search ? (
                <p>Showing <strong>{filteredCount}</strong> filtered result{filteredCount !==1 && 's'} out of <strong>{totalCount}</strong> entr{totalCount !==1 ? 'ies' : 'y'}</p>
            ) : (
                <p>Showing <strong>{sumber.from}</strong> to <strong>{sumber.to}</strong> from <strong>{sumber.total}</strong> entr{sumber.total !==1 ? 'ies' : 'y'}</p>
            )}
            <div className="flex items-center gap-2">
                <span className="text-sm">Row per page:</span>
                <Select onValueChange={onPerPageChange} value={perPage}>
                    <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder="Row" />
                    </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="-1">All</SelectItem>
                    </SelectContent>

                </Select>
            </div>

            <div className="flex items-center gap-2">
                {sumber.links.map((link, index) => (
                    <Link
                    className={`px-3 py-2 border rounded-md ${link.active ? 'bg-amber-500 text-white' : ''}`}
                        href={link.url || '#'}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
            
        </div>
    )

}
import { Link } from "@inertiajs/react";

interface LinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: LinkType[];
}

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap gap-1 mt-6">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || ""}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`
                        px-3 py-1 text-sm rounded-md border
                        ${link.active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 hover:bg-gray-100"}
                        ${!link.url && "opacity-50 cursor-not-allowed"}
                    `}
                    as={!link.url ? "span" : "a"}
                />
            ))}
        </div>
    );
}
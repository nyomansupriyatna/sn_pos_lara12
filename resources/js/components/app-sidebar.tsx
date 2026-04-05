import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, AppWindow, Bolt, Settings  } from 'lucide-react';
import { useState } from 'react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { useLayout } from '@/contexts/LayoutContext';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Billing',
        href: '#',
        icon: AppWindow ,
    },
    {
        title: 'Outlet',
        href: '/outlets',
        icon: AppWindow ,
    },
    {
        title: 'Master Data',
        href: '#',
        icon: AppWindow ,
    },
    {
        title: 'Setting',
        href: '#',
        icon: Settings  ,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];



export function AppSidebar() {

    // -----------------------------------new
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const { position } = useLayout();

    return (
        <Sidebar side={position} collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarContent>
                 {/* Master Menu */}
                <div>
                    <button
                        onClick={() => toggleMenu("master")}
                        className="w-full text-left py-2 px-3 rounded hover:bg-gray-700 flex justify-between items-center"
                    >
                        Master Data
                        <span>{openMenu === "master" ? "-" : "+"}</span>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300  ${
                            openMenu === "master"
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <Link
                            href="/properties"
                            className="block pl-8 py-2 hover:bg-gray-700"
                        >
                            Property
                        </Link>
                        <Link
                            href="/customers"
                            className="block pl-8 py-2 hover:bg-gray-700"
                        >
                            Customers
                        </Link>
                    </div>
                </div>

                {/* Reports */}
                <div>
                    <button
                        onClick={() => toggleMenu("report")}
                        className="w-full text-left py-2 px-3 rounded hover:bg-gray-700 flex justify-between items-center"
                    >
                        Reports
                        <span>{openMenu === "report" ? "-" : "+"}</span>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ${
                            openMenu === "report"
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <Link
                            href="/sales"
                            className="block pl-8 py-2 hover:bg-gray-700"
                        >
                            Sales Report
                        </Link>
                        <Link
                            href="/stock"
                            className="block pl-8 py-2 hover:bg-gray-700"
                        >
                            Stock Report
                        </Link>
                    </div>
                </div>
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

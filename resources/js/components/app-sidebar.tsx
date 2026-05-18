import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid,  Lock, Shield, User, Home, Group, CircleArrowOutUpLeft, AlignVerticalJustifyStart, Coffee, CircleDollarSign, Donut   } from 'lucide-react';
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
        title: 'Permission',
        href: '/permissions',
        icon: Lock,
        permission: 'access-permissions-module'
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Shield,
        permission: 'access-roles-module'
    },
    {
        title: 'User',
        href: '/users',
        icon: User,
        permission: 'access-users-module'
    },
    {
        title: 'Outlet',
        href: '/outlets',
        icon: CircleArrowOutUpLeft ,
        permission: 'access-outlets-module'
    },
    {
        title: 'Group',
        href: '/groups',
        icon: Group,
        permission: 'access-groups-module'
    },
    {
        title: 'Sub Group',
        href: '/subgroups',
        icon: AlignVerticalJustifyStart,
        permission: 'access-subgroups-module'
    },
    {
        title: 'Portion',
        href: '/portions',
        icon: Coffee ,
        permission: 'access-portions-module'
    },
    {
        title: 'Currency',
        href: '/currencies',
        icon: CircleDollarSign,
        permission: 'access-currencies-module'
    },
    {
        title: 'Property',
        href: '/properties',
        icon: Home ,
        permission: 'access-properties-module'
    },
    {
        title: 'Items',
        href: '/items',
        icon: Donut,
        permission: 'access-items-module'
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

    // console.log('use Page--->',usePage().props);
    const { auth } = usePage().props as any;
    const roles = auth.roles;
    const permissions = auth.permissions;

    const { position } = useLayout();

    const filteredNavItems = mainNavItems.filter((item) => !item.permission || permissions.includes(item.permission));

    // console.log(filteredNavItems);

    // -----------------------------------new
    const [openMenu, setOpenMenu] = useState<string | null>(null);


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
                <NavMain items={filteredNavItems} position={position} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser position={position}/>
            </SidebarFooter>
        </Sidebar>
    );
}

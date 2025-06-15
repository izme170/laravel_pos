import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Package,
    PackagePlus,
    PackageSearch,
    Filter,
    Trash2,
    Users,
    Eye,
    Edit,
    UserCheck,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    // DashboardController
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    // ProductController
    {
        title: 'All Products',
        href: '/products',
        icon: Package,
    },
    {
        title: 'Add Product',
        href: '/products/create',
        icon: PackagePlus,
    },
    {
        title: 'Search Products',
        href: '/products/search',
        icon: PackageSearch,
    },
    {
        title: 'Filter Products',
        href: '/products/filter',
        icon: Filter,
    },
    {
        title: 'Trashed Products',
        href: '/products/trashed',
        icon: Trash2,
    },

    // UserController
    {
        title: 'All Users',
        href: '/users',
        icon: Users,
    },
    {
        title: 'User Details (sample)',
        href: '/users/1', // Optional: sample, replace dynamically if needed
        icon: Eye,
    },
    {
        title: 'Edit User (sample)',
        href: '/users/1/edit', // Optional: sample, replace dynamically
        icon: Edit,
    },
    {
        title: 'User Roles',
        href: '/users/roles', // Make sure this is handled in UserController
        icon: UserCheck,
    },
];



export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

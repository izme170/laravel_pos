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
    Trash2,
    Users,
    Eye,
    Edit,
    UserCheck,
    ReceiptText,
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

    // TransactionController
    {
        title: 'All Transactions', // New navigation item for transactions
        href: '/transactions',
        icon: ReceiptText, // Using ReceiptText icon for transactions
    },

    {
        title: 'Trashed Products',
        href: '/products/trashed',
        icon: Trash2,
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

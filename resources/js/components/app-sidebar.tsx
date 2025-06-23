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
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Package,
    PackagePlus,
    Trash2,
    Users,
    UserPlus,
    ReceiptText,
    UserCheck,
    Building2,
    Building2Icon,
    Folder,
    FolderMinus,
} from 'lucide-react';
import AppLogo from './app-logo';

// Assuming NavItem can have a 'children' property for nested items
// You might need to update your NavItem type definition:
// export type NavItem = {
//     title: string;
//     href?: string; // href is optional for parent items
//     icon?: React.ElementType;
//     children?: NavItem[]; // Add this
// };

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    // ProductController
    {
        title: 'Products', // A parent item for products (optional, but good for consistency)
        icon: Package, // You might want a general product icon
        children: [
            {
                title: 'All Products',
                href: '/products',
                icon: Package, // Keep individual icons if desired
            },
            {
                title: 'Add Product',
                href: '/products/create',
                icon: PackagePlus,
            },
            {
                title: 'Trashed Products',
                href: '/products/trashed',
                icon: Trash2,
            },
        ],
    },

    // TransactionController
    {
        title: 'All Transactions',
        href: '/transactions',
        icon: ReceiptText,
    },

    // User Management Section - Now a collapsible parent
    {
        title: 'User Management',
        icon: Users, // A general icon for user management
        children: [
            {
                title: 'All Users',
                href: '/users',
                icon: Users, // Specific icon for All Users
            },
            {
                title: 'Add User',
                href: '/users/create',
                icon: UserPlus,
            },
        ],
    },

    // Supplier Management Section - New collapsible parent
    {
        title: 'Supplier Management',
        icon: Building2, // A general icon for supplier management
        children: [
            {
                title: 'All Suppliers',
                href: '/suppliers',
                icon: Building2, // Specific icon for All Suppliers
            },
            {
                title: 'Add Supplier',
                href: '/suppliers/create',
                icon: Building2Icon,
            },
        ],
    },
    {
        title: 'Categories',
        icon: Folder,
        children: [
            {
                title: 'All Categories',
                href: '/categories',
                icon: Folder,
            },
            {
                title: 'Trashed Categories',
                href: '/categories/trashed',
                icon: FolderMinus,
            },
        ],
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
                {/* NavMain will need to handle rendering nested items */}
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
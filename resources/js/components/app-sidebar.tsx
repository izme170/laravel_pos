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
    Tag,
    ShoppingCart,
} from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    // ProductController
    {
        title: 'Products',
        icon: Package,
        children: [
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
        icon: Users,
        children: [
            {
                title: 'All Users',
                href: '/users',
                icon: Users,
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
        icon: Building2,
        children: [
            {
                title: 'All Suppliers',
                href: '/suppliers',
                icon: Building2,
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
    {
        title: 'Brand Management',
        icon: Package, // Consider using another icon like 'Tag' or 'Bookmark' if it fits better
        children: [
            {
                title: 'All Brands',
                href: '/brands',
                icon: Package,
            },
            {
                title: 'Add Brand',
                href: '/brands/create', icon: PackagePlus,
            },
        ],
    },
    {
        title: 'Pos',
        href: '/transactions/create',
        icon: ShoppingCart,
    }


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
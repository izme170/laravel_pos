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
import { usePage } from '@inertiajs/react';
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

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.role?.name;

    // Define menu items based on user role
    const getNavItems = (): NavItem[] => {
        // If user is Cashier, show only POS
        if (userRole === 'Cashier') {
            return [
                {
                    title: 'Pos',
                    href: '/transactions/create',
                    icon: ShoppingCart,
                }
            ];
        }

        // For Admin and Manager, show all menus
        return [
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
            // User Management Section - Only show for Admin
            ...(userRole === 'Admin' ? [{
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
            }] : []),
            // Supplier Management Section
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
                icon: Package,
                children: [
                    {
                        title: 'All Brands',
                        href: '/brands',
                        icon: Package,
                    },
                    {
                        title: 'Add Brand',
                        href: '/brands/create',
                        icon: PackagePlus,
                    },
                ],
            },
            {
                title: 'Pos',
                href: '/transactions/create',
                icon: ShoppingCart,
            }
        ];
    };

    const mainNavItems = getNavItems();

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
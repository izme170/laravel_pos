import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react'; // Import useState
import { ChevronDown, ChevronRight } from 'lucide-react'; // Import icons for expand/collapse

// Helper component to render individual NavItems, handling nesting and collapsibility
function NavItemRenderer({ item }: { item: NavItem }) {
    const page = usePage();
    const [isCollapsed, setIsCollapsed] = useState(true); // State for collapse/expand

    const toggleCollapse = (e: React.MouseEvent) => {
        // Prevent navigation if the parent is meant to be just a toggle
        if (!item.href) {
            e.preventDefault();
        }
        setIsCollapsed(!isCollapsed);
    };

    // If the item has children, it's a collapsible parent
    if (item.children && item.children.length > 0) {
        // Determine if any child of this parent is active to keep it expanded
        const isAnyChildActive = item.children.some(child =>
            child.href && page.url.startsWith(child.href)
        );

        // Auto-expand if a child is active
        // This makes sure the parent is open if a sub-item is the current page
        useState(() => {
            if (isAnyChildActive) {
                setIsCollapsed(false);
            }
        });

        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    onClick={toggleCollapse}
                    // Consider if the parent button itself should be active if a child is
                    isActive={isAnyChildActive && isCollapsed} // Only show active if it's currently collapsed but has an active child
                    tooltip={{ children: item.title }}
                >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    {/* Expand/Collapse Icon */}
                    {isCollapsed ? (
                        <ChevronRight className="ml-auto w-4 h-4" />
                    ) : (
                        <ChevronDown className="ml-auto w-4 h-4" />
                    )}
                </SidebarMenuButton>

                {!isCollapsed && (
                    <div className="ml-6"> {/* Indent children */}
                        <SidebarMenu>
                            {item.children.map((child) => (
                                <NavItemRenderer key={child.title} item={child} />
                            ))}
                        </SidebarMenu>
                    </div>
                )}
            </SidebarMenuItem>
        );
    } else {
        // This is a regular navigation item (no children)
        return (
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={item.href ? page.url.startsWith(item.href) : false} tooltip={{ children: item.title }}>
                    <Link href={item.href || '#'} prefetch> {/* Use '#' or a sensible default if href is optional */}
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <NavItemRenderer key={item.title} item={item} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
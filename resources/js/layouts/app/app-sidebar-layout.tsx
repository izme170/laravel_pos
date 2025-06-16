import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from '@/components/user-nav';

interface AppLayoutTemplateProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export function AppLayoutTemplate({ children, breadcrumbs }: AppLayoutTemplateProps) {
    return (
        <div className="min-h-screen bg-background">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    <div className="flex flex-col flex-grow pt-5 bg-background border-r overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <Link href={route('dashboard')}>
                                <h1 className="text-xl font-bold">POS System</h1>
                            </Link>
                        </div>
                        <div className="mt-5 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 space-y-1">
                                <Link
                                    href={route('dashboard')}
                                    className="group flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('products.index')}
                                    className="group flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    Products
                                </Link>
                                <Link
                                    href={route('transactions.index')}
                                    className="group flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    Transactions
                                </Link>
                                <Link
                                    href={route('brands.index')}
                                    className="group flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    Brands
                                </Link>
                                <Link
                                    href={route('categories.index')}
                                    className="group flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    Categories
                                </Link>
                                <Link
                                    href={route('suppliers.index')}
                                    className="group flex items-center px-2 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                    Suppliers
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 md:pl-64">
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                        <div className="flex h-16 items-center px-4">
                            <div className="flex items-center space-x-4">
                                <ThemeToggle />
                            </div>
                            <div className="ml-auto flex items-center space-x-4">
                                <UserNav />
                            </div>
                        </div>
                    </div>

                    <main className="py-6 px-4">
                        {breadcrumbs && (
                            <div className="flex items-center space-x-2 text-sm mb-4">
                                {breadcrumbs.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        {item.url ? (
                                            <Link
                                                href={item.url}
                                                className="text-primary hover:underline"
                                            >
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                {item.title}
                                            </span>
                                        )}
                                        {index < breadcrumbs.length - 1 && (
                                            <span className="mx-2 text-muted-foreground">/</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
// dashboard.tsx
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

// Chart.js imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

// Icons
import {
    Box,
    Tag,
    ShoppingCart,
    Users,
    CreditCard,
    Percent,
    TrendingUp,
    Package,
    Layers,
    ShoppingBag,
    Truck,
    Award,
    PieChart,
    BarChart2,
    Wallet
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    totalProducts: number;
    totalCategories: number;
    totalBrands: number;
    totalSuppliers: number;
    totalUsers: number;
    totalTransactions: number;
    totalDiscounts: number;
    salesLast7Days: {
        labels: string[];
        data: number[];
    };
    productsByCategory: {
        labels: string[];
        data: number[];
    };
    productsByBrand: {
        labels: string[];
        data: number[];
    };
    topSellingProducts: {
        labels: string[];
        data: number[];
    };
    transactionsByPaymentMethod: {
        labels: string[];
        data: number[];
    };
}

export default function Dashboard({
    totalProducts,
    totalCategories,
    totalBrands,
    totalSuppliers,
    totalUsers,
    totalTransactions,
    totalDiscounts,
    salesLast7Days,
    productsByCategory,
    productsByBrand,
    topSellingProducts,
    transactionsByPaymentMethod,
}: DashboardProps) {

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'hsl(var(--foreground))',
                },
            },
            title: {
                display: true,
                font: {
                    size: 16,
                },
                color: 'hsl(var(--foreground))',
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(context.parsed.y);
                        } else if (context.parsed !== null) {
                            label += context.parsed;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: 'hsl(var(--muted-foreground))' },
                grid: { color: 'hsl(var(--border))' },
            },
            y: {
                ticks: { color: 'hsl(var(--muted-foreground))' },
                grid: { color: 'hsl(var(--border))' },
            },
        },
    };

    const salesData = {
        labels: salesLast7Days.labels,
        datasets: [
            {
                label: 'Total Sales (PHP)',
                data: salesLast7Days.data,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const productsByCategoryData = {
        labels: productsByCategory?.labels || [],
        datasets: [
            {
                label: 'Products',
                data: productsByCategory?.data || [],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(20, 184, 166, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(220, 38, 38, 0.7)',
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(14, 165, 233, 1)',
                    'rgba(20, 184, 166, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(220, 38, 38, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const productsByBrandData = {
        labels: productsByBrand?.labels || [],
        datasets: [
            {
                label: 'Products',
                data: productsByBrand?.data || [],
                backgroundColor: [
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(20, 184, 166, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(99, 102, 241, 0.7)',
                ],
                borderColor: [
                    'rgba(236, 72, 153, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(20, 184, 166, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(14, 165, 233, 1)',
                    'rgba(99, 102, 241, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const topSellingProductsData = {
        labels: topSellingProducts.labels,
        datasets: [
            {
                label: 'Quantity Sold',
                data: topSellingProducts.data,
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 1,
            },
        ],
    };

    const transactionsByPaymentMethodData = {
        labels: transactionsByPaymentMethod.labels,
        datasets: [
            {
                label: 'Number of Transactions',
                data: transactionsByPaymentMethod.data,
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(20, 184, 166, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(14, 165, 233, 1)',
                    'rgba(20, 184, 166, 1)',
                    'rgba(245, 158, 11, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Stats card component
    const StatCard = ({
        title,
        value,
        icon: Icon,
        trend
    }: {
        title: string;
        value: number;
        icon: React.ComponentType<{ className?: string }>;
        trend?: 'up' | 'down' | 'neutral';
    }) => (
        <div className="relative p-6 rounded-xl bg-card border border-border shadow-sm transition-all hover:shadow-md">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-muted/20" />
            <div className="relative z-10 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="size-5 text-primary" />
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">{value}</p>
                    {trend && (
                        <span className={`inline-flex items-center text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {trend === 'up' ? (
                                <>
                                    <TrendingUp className="size-4 mr-1" /> 12.5%
                                </>
                            ) : trend === 'down' ? (
                                <>
                                    <TrendingUp className="size-4 mr-1 rotate-180" /> 2.5%
                                </>
                            ) : (
                                '0%'
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <StatCard
                        title="Total Products"
                        value={totalProducts}
                        icon={Package}
                        trend="up"
                    />
                    <StatCard
                        title="Total Categories"
                        value={totalCategories}
                        icon={Layers}
                        trend="neutral"
                    />
                    <StatCard
                        title="Total Brands"
                        value={totalBrands}
                        icon={Award}
                        trend="up"
                    />
                    <StatCard
                        title="Total Suppliers"
                        value={totalSuppliers}
                        icon={Truck}
                        trend="neutral"
                    />
                    <StatCard
                        title="Total Users"
                        value={totalUsers}
                        icon={Users}
                        trend="up"
                    />
                    <StatCard
                        title="Total Transactions"
                        value={totalTransactions}
                        icon={ShoppingCart}
                        trend="up"
                    />
                    <StatCard
                        title="Total Discounts"
                        value={totalDiscounts}
                        icon={Percent}
                        trend="down"
                    />
                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                    {/* Sales Over Time */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <TrendingUp className="size-5 text-primary" />
                                Sales Over Time (Last 7 Days)
                            </h3>
                        </div>
                        <div className="h-80">
                            {salesLast7Days.labels.length > 0 ? (
                                <Line
                                    data={salesData}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No sales data for the last 7 days.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Selling Products */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <BarChart2 className="size-5 text-primary" />
                                Top 5 Selling Products
                            </h3>
                        </div>
                        <div className="h-80">
                            {topSellingProducts.labels.length > 0 ? (
                                <Bar
                                    data={topSellingProductsData}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No top selling products data available.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Products by Category */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <PieChart className="size-5 text-primary" />
                                Products by Category
                            </h3>
                        </div>
                        <div className="h-80">
                            {productsByCategory.labels.length > 0 ? (
                                <Doughnut
                                    data={productsByCategoryData}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No products by category data available.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transactions by Payment Method */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Wallet className="size-5 text-primary" />
                                Transactions by Payment Method
                            </h3>
                        </div>
                        <div className="h-80">
                            {transactionsByPaymentMethod.labels.length > 0 ? (
                                <Bar
                                    data={transactionsByPaymentMethodData}
                                    options={{
                                        ...chartOptions,
                                        plugins: {
                                            ...chartOptions.plugins,
                                            title: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No transactions by payment method data available.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
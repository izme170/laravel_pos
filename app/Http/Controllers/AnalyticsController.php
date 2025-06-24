<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Discount;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Transaction;
use App\Models\Item; 
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; 
use Carbon\Carbon; 

class AnalyticsController extends Controller
{
    /**
     * Get data for the dashboard.
     *
     * @return \Inertia\Response
     */
    public function getDashboardData()
    {
        // Fetch various analytics data
        $totalProducts = $this->getTotalProducts();
        $totalCategories = $this->getTotalCategories();
        $totalBrands = $this->getTotalBrands();
        $totalSuppliers = $this->getTotalSuppliers();
        $totalUsers = $this->getTotalUsers();
        $totalTransactions = $this->getTotalTransactions();
        $totalDiscounts = $this->getTotalDiscounts();
        $salesLast7Days = $this->getSalesLast7Days();
        $topSellingProducts = $this->getTopSellingProducts();
        $transactionsByPaymentMethod = $this->getTransactionsByPaymentMethod();
        $productsByCategory = $this->getProductsByCategory(); 
        $productsByBrand = $this->getProductsByBrand();     


        // Return the data to the Inertia frontend
        return Inertia::render('dashboard', [
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
            'totalBrands' => $totalBrands,
            'totalSuppliers' => $totalSuppliers,
            'totalUsers' => $totalUsers,
            'totalTransactions' => $totalTransactions,
            'totalDiscounts' => $totalDiscounts,
            'salesLast7Days' => $salesLast7Days,
            'topSellingProducts' => $topSellingProducts,
            'transactionsByPaymentMethod' => $transactionsByPaymentMethod,
            'productsByCategory' => $productsByCategory,
            'productsByBrand' => $productsByBrand,     
        ]);
    }

    /**
     * Get the total number of products.
     *
     * @return int
     */
    private function getTotalProducts(): int
    {
        return Product::count();
    }

    /**
     * Get the total number of categories.
     *
     * @return int
     */
    private function getTotalCategories(): int
    {
        return Category::count();
    }

    /**
     * Get the total number of brands.
     *
     * @return int
     */
    private function getTotalBrands(): int
    {
        return Brand::count();
    }

    /**
     * Get the total number of suppliers.
     *
     * @return int
     */
    private function getTotalSuppliers(): int
    {
        return Supplier::count();
    }

    /**
     * Get the total number of users.
     *
     * @return int
     */
    private function getTotalUsers(): int
    {
        return User::count();
    }

    /**
     * Get the total number of transactions.
     *
     * @return int
     */
    private function getTotalTransactions(): int
    {
        return Transaction::count();
    }

    /**
     * Get the total number of discounts.
     *
     * @return int
     */
    private function getTotalDiscounts(): int
    {
        return Discount::count();
    }

    /**
     * Get total sales data for the last 7 days.
     *
     * @return array
     */
    private function getSalesLast7Days(): array
    {
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $sales = Transaction::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as total_sales')
            )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        $labels = [];
        $data = [];

        // Ensure all 7 days are represented, even if no sales occurred
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $formattedDate = $date->format('Y-m-d');
            $displayLabel = $date->format('M d'); 

            $labels[] = $displayLabel;

            $foundSales = $sales->where('date', $formattedDate)->first();
            $data[] = $foundSales ? (float) $foundSales->total_sales : 0;
        }

        return [
            'labels' => $labels,
            'data' => $data,
        ];
    }

    /**
     * Get the top selling products.
     * This method now correctly uses the 'items' table (your 'Item' model).
     *
     * @param int $limit
     * @return array
     */
    private function getTopSellingProducts($limit = 5): array
    {
        // Using `Item::query()` and joining with `products`
        $topProducts = Item::query()
            ->join('products', 'items.product_id', '=', 'products.id')
            ->select('products.name', DB::raw('SUM(items.quantity) as total_quantity_sold'))
            ->groupBy('products.name')
            ->orderByDesc('total_quantity_sold')
            ->limit($limit)
            ->get();

        return [
            'labels' => $topProducts->pluck('name')->toArray(),
            'data' => $topProducts->pluck('total_quantity_sold')->toArray(),
        ];
    }

    /**
     * Get transactions breakdown by payment method.
     *
     * @return array
     */
    private function getTransactionsByPaymentMethod(): array
    {
        
        $paymentMethods = PaymentMethod::withCount('transactions')->get();

        return [
            'labels' => $paymentMethods->pluck('name')->toArray(),
            'data' => $paymentMethods->pluck('transactions_count')->toArray(),
        ];
    }

    /**
     * Get product count by category.
     * @return array
     */
    private function getProductsByCategory(): array
    {
        
        $products = Product::select('categories.name', DB::raw('COUNT(products.id) as product_count'))
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->groupBy('categories.name')
            ->orderBy('categories.name')
            ->get();

        return [
            'labels' => $products->pluck('name')->toArray(),
            'data' => $products->pluck('product_count')->toArray(),
        ];
    }

    /**
     * Get product count by brand.
     * @return array
     */
    private function getProductsByBrand(): array
    {
        
        $products = Product::select('brands.name', DB::raw('COUNT(products.id) as product_count'))
            ->join('brands', 'products.brand_id', '=', 'brands.id')
            ->groupBy('brands.name')
            ->orderBy('brands.name') 
            ->get();

        return [
            'labels' => $products->pluck('name')->toArray(),
            'data' => $products->pluck('product_count')->toArray(),
        ];
    }
}
<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\PaymentMethod;
use App\Models\Role;
use App\Models\Supplier;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'Admin'
        ]);
        Role::create([
            'name' => 'Manager'
        ]);
        Role::create([
            'name' => 'Cashier'
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => bcrypt('password'),
            'role_id' => 1
        ]);

        Brand::factory(10)->create();
        Supplier::factory(10)->create();

        // Categories
        $categories = [
            'Beverages',
            'Snacks',
            'Groceries',
            'Personal Care',
            'Household',
            'Electronics',
            'Stationery',
            'Pharmacy'
        ];
        foreach ($categories as $category) {
            Category::firstOrCreate(['name' => $category]);
        }

        $paymentMethods = [
            'Cash',
            'Credit Card',
            'Debit Card',
            'Mobile Payment',
            'Bank Transfer'
        ];
        foreach ($paymentMethods as $method) {
            PaymentMethod::firstOrCreate(['name' => $method]);
        }
    }
}

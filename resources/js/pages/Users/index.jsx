import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Index({ users }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Users', href: '/users' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h1>
                    <Link
                        href={route('users.create')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                        Add New User
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Joined
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {user.image ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full mr-3"
                                                        src={`/storage/images/${user.image}`}
                                                        alt={user.name}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
                                                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        ID: {user.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {user.email}
                                            </div>
                                            {user.email_verified_at && (
                                                <div className="text-xs text-green-600 dark:text-green-400">
                                                    Verified
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role?.name === 'admin'
                                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                                                : user.role?.name === 'manager'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                                                }`}>
                                                {user.role?.name || 'No Role'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.email_verified_at
                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                                }`}>
                                                {user.email_verified_at ? 'Active' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('users.show', user.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('users.edit', user.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No users found.</p>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {users.filter(user => user.email_verified_at).length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Admins</h3>
                        <p className="text-2xl font-bold text-purple-600">
                            {users.filter(user => user.role?.name === 'admin').length}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
                        <p className="text-2xl font-bold text-yellow-600">
                            {users.filter(user => !user.email_verified_at).length}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
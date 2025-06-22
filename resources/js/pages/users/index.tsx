import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Eye, Edit, Trash2, UserPlus, Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { User as UserType } from '@/types';

interface UsersIndexProps {
    users: UserType[];
}

export default function UsersIndex({ users }: UsersIndexProps) {
    return (
        <AppLayout>
            <Head title="Users" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header with title and actions */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your team members and their permissions
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Link href={route('users.create')}>
                                <Button className="gap-2">
                                    <UserPlus className="h-4 w-4" />
                                    Add User
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filters and search */}
                    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search users..."
                                    className="pl-10"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Export</DropdownMenuItem>
                                        <DropdownMenuItem>Bulk Actions</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    {/* Users table */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-700">
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <TableCell className="font-medium">{user.id}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Joined {new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    (user as any).role?.name === 'Admin'
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className={
                                                    (user as any).role?.name === 'Admin'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                        : ''
                                                }
                                            >
                                                {(user as any).role?.name || 'N/A'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('users.show', user.id)} className="flex items-center gap-2 w-full">
                                                                <Eye className="h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('users.edit', user.id)} className="flex items-center gap-2 w-full">
                                                                <Edit className="h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this user?')) {
                                                                    (window as any).Inertia.delete(route('users.destroy', user.id));
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {users.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                    <UserPlus className="h-5 w-5 text-gray-400" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">No users</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Get started by creating a new user.
                                </p>
                                <div className="mt-6">
                                    <Link href={route('users.create')}>
                                        <Button>
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Add User
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
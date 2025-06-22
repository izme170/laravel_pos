import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User as UserType } from '@/types';
import { User, Mail, Calendar, Clock, Edit, ArrowLeft, BadgeCheck } from 'lucide-react';

interface UsersShowProps {
    user: UserType;
}

export default function UsersShow({ user }: UsersShowProps) {
    return (
        <AppLayout>
            <Head title={`User: ${user.name}`} />

            <div className="py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Details</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Viewing details for {user.name}
                            </p>
                        </div>
                    </div>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border-0">
                        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/5 to-primary/10">
                            <CardTitle className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-primary text-white">
                                    <BadgeCheck className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-semibold">User Profile</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user.avatar || `/storage/images/${user.image}`} alt={user.name} />
                                    <AvatarFallback className="text-2xl font-medium">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center sm:justify-start gap-2">
                                        {user.name}
                                        <Badge variant="secondary" className="ml-2">
                                            {(user as any).role?.name || 'N/A'}
                                        </Badge>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                                        <p className="text-lg text-gray-900 dark:text-gray-100">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                                        <p className="text-lg text-gray-900 dark:text-gray-100">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-primary">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                                        <p className="text-lg text-gray-900 dark:text-gray-100">
                                            {new Date(user.updated_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                                <Link href={route('users.index')}>
                                    <Button variant="outline" className="w-full sm:w-auto gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Users
                                    </Button>
                                </Link>
                                <Link href={route('users.edit', user.id)}>
                                    <Button variant="secondary" className="w-full sm:w-auto gap-2">
                                        <Edit className="w-4 h-4" />
                                        Edit User
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
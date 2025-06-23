import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { User, Mail, KeyRound, Image, PlusCircle, UserPlus, BadgeCheck, Upload, Lock } from 'lucide-react'; // Import Lock icon

interface Role {
    id: number;
    name: string;
}

interface UsersCreateProps {
    roles: Role[];
}

export default function UsersCreate({ roles }: UsersCreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '', // Add password field
        role_id: '',
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };

    return (
        <AppLayout>
            <Head title="Create User" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New User</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Fill in the details to add a new user to the system
                            </p>
                        </div>
                    </div>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border-0">
                        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/5 to-primary/10">
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-primary text-white">
                                    <PlusCircle className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-semibold">User Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <User className="w-4 h-4 text-primary" />
                                            <span>Full Name</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full pl-10"
                                                autoComplete="name"
                                                placeholder="John Doe"
                                            />
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors.name} className="mt-1" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Mail className="w-4 h-4 text-primary" />
                                            <span>Email Address</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full pl-10"
                                                autoComplete="email"
                                                placeholder="user@example.com"
                                            />
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors.email} className="mt-1" />
                                    </div>

                                    {/* New: Password Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Lock className="w-4 h-4 text-primary" />
                                            <span>Password</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full pl-10"
                                                autoComplete="new-password"
                                                placeholder="Enter password"
                                            />
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors.password} className="mt-1" />
                                    </div>


                                    <div className="space-y-2">
                                        <Label htmlFor="role_id" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <BadgeCheck className="w-4 h-4 text-primary" />
                                            <span>User Role</span>
                                        </Label>
                                        <div className="relative">
                                            <Select
                                                onValueChange={(value: string) => setData('role_id', value)}
                                                value={data.role_id.toString()}
                                            >
                                                <SelectTrigger className="w-full pl-10">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {roles.map((role) => (
                                                        <SelectItem key={role.id} value={role.id.toString()}>
                                                            {role.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors.role_id} className="mt-1" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <Image className="w-4 h-4 text-primary" />
                                            <span>Profile Picture</span>
                                        </Label>
                                        <div className="flex items-center gap-4">
                                            <label className="w-full">
                                                <div className="relative cursor-pointer">
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        name="image"
                                                        onChange={handleImageChange}
                                                        className="w-full opacity-0 absolute inset-0 cursor-pointer"
                                                        accept="image/*"
                                                    />
                                                    <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                                                        <Upload className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {data.image ? data.image.name : 'Click to upload'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <InputError message={errors.image} className="mt-1" />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <UserPlus className="w-4 h-4" />
                                                Create User
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
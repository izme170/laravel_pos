import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

interface AuthLayoutTemplateProps {
    children: ReactNode;
    title: string;
    description: string;
}

export function AuthLayoutTemplate({ children, title, description }: AuthLayoutTemplateProps) {
    return (
        <div className="min-h-screen bg-background">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Link href={route('home')}>
                            <h1 className="text-xl font-bold">POS System</h1>
                        </Link>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This POS system has saved me countless hours of work and
                                helped me streamline my business operations.&rdquo;
                            </p>
                            <footer className="text-sm">Business Owner</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                        {children}
                        <div className="absolute top-4 right-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
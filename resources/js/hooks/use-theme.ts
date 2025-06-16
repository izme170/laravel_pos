import { useEffect, useState } from 'react';

export function useTheme() {
    const [theme, setThemeState] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setThemeState(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark');
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (newTheme: 'light' | 'dark') => {
        setThemeState(newTheme);
    };

    return { theme, setTheme };
}
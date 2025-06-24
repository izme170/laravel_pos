import React from 'react';
import { Head, router } from '@inertiajs/react';

export default function Unauthorized() {
    return (
        <>
            <Head title="Unauthorized" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-16 w-16 text-red-500 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                    </svg>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized</h1>
                    <p className="text-gray-600 mb-6">
                        You do not have permission to access this page.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </>
    );
}
import React, { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { type SharedData } from '@/types';

export default function Authenticated({ children }: PropsWithChildren) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/menu', name: 'Menu' },
        { href: '/subscription', name: 'Subscription' },
        { href: '/contact', name: 'Contact Us' },
        { href: '/dashboard', name: 'Dashboard' },
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <header className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/storage/assets/sea-logo.png" alt="SEA Catering Logo" className="h-15 mr-3 cursor-pointer hover:opacity-80 transition-opacity" />
                    </Link>
                </div>
                <nav className="hidden md:flex items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                                window.location.pathname === link.href ? 'text-white bg-gray-700' : ''
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {auth.user && (auth.user as any).role === 'admin' && (
                        <Link 
                            href="/admin/dashboard" 
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-yellow-600 hover:bg-yellow-700 ml-4"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                    <Link 
                        href="/logout" 
                        method="post"
                        as="button"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 ml-4"
                    >
                        Logout
                    </Link>
                </nav>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {auth.user && (auth.user as any).role === 'admin' && (
                            <Link 
                                href="/admin/dashboard" 
                                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-yellow-600 hover:bg-yellow-700"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                        <Link 
                            href="/logout" 
                            method="post"
                            as="button"
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            )}

            <main>{children}</main>
        </div>
    );
}

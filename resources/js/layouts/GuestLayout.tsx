import { Link, Head, usePage } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';
import { type SharedData } from '@/types';

interface GuestLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function GuestLayout({ children, title }: GuestLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    const navLinks = [
        { href: '/', name: 'Home' },
        { href: '/menu', name: 'Menu' },
        { href: '/subscription', name: 'Subscription' },
        { href: '/contact', name: 'Contact Us' },
    ];

    return (
        <>
            <Head title={title} />
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
                        {auth.user && (
                            <Link 
                                href="/dashboard" 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 ml-4"
                            >
                                Dashboard
                            </Link>
                        )}
                        {auth.user && (auth.user as any).role === 'admin' && (
                            <Link 
                                href="/admin/dashboard" 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-yellow-600 hover:bg-yellow-700 ml-4"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                        {auth.user ? (
                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-4"
                            >
                                Logout
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-4">Login</Link>
                                <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">Register</Link>
                            </>
                        )}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </header>
                {isMenuOpen && (
                    <nav className="md:hidden bg-gray-800">
                        {navLinks.map((link) => (
                             <Link
                                key={link.name}
                                href={link.href}
                                className={`block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium ${
                                    window.location.pathname === link.href ? 'text-white bg-gray-700' : ''
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {auth.user && (
                            <Link 
                                href="/dashboard" 
                                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 m-2"
                            >
                                Dashboard
                            </Link>
                        )}
                        {auth.user && (auth.user as any).role === 'admin' && (
                            <Link 
                                href="/admin/dashboard" 
                                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium bg-yellow-600 hover:bg-yellow-700 m-2"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                        {auth.user ? (
                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium m-2"
                            >
                                Logout
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium m-2">Login</Link>
                                <Link href="/register" className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium m-2">Register</Link>
                            </>
                        )}
                    </nav>
                )}

                <main>{children}</main>

                {/* Footer */}
                <footer id="contact" className="bg-gray-900 py-10 mt-10">
                    <div className="container mx-auto px-6 text-center text-gray-400">
                        <p>Contact us for any inquiries.</p>
                        <p className="mt-2">Manager: Brian</p>
                        <p>Phone: 08123456789</p>
                        <p className="mt-4 text-sm">&copy; 2025 SEA Catering. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

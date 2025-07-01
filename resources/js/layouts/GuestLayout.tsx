import { Link, Head } from '@inertiajs/react';
import { useState, type ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function GuestLayout({ children, title }: GuestLayoutProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <img src="/storage/assets/sea-logo.png" alt="SEA Catering Logo" className="h-10 mr-3" />
                        <span className="font-bold text-xl">SEA Catering</span>
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
                        <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-4">Login</Link>
                        <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">Register</Link>
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
                        <Link href="/login" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium m-2">Login</Link>
                        <Link href="/register" className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium m-2">Register</Link>
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

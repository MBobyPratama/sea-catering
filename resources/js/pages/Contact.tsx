import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <GuestLayout title="Contact Us">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
                    <p className="text-lg">For any inquiries, please reach out to our manager.</p>
                    <p className="mt-4 font-bold">Manager: Brian</p>
                    <p>Phone: 08123456789</p>
                </div>
            </div>
        </GuestLayout>
    );
}

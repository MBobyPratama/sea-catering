import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Subscription {
    id: number;
    meal_plan: {
        name: string;
        price: number;
    };
    status: string;
}

interface Props {
    subscriptions: Subscription[];
}

const Dashboard: React.FC<Props> = ({ subscriptions }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Your Subscriptions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {subscriptions.map((subscription) => (
                                    <div key={subscription.id} className="bg-gray-100 p-6 rounded-lg">
                                        <h3 className="text-lg font-semibold">{subscription.meal_plan.name}</h3>
                                        <p>Status: {subscription.status}</p>
                                        <p>Price: ${subscription.meal_plan.price}</p>
                                        <div className="mt-4">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Pause</button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;

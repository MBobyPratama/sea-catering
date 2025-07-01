import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Props {
    newSubscriptions: number;
    mrr: number;
    startDate: string;
    endDate: string;
}

const AdminDashboard: React.FC<Props> = ({ newSubscriptions, mrr, startDate, endDate }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Admin Dashboard</h2>
                            <form method="get" action="/admin/dashboard">
                                <input type="date" name="start_date" defaultValue={startDate} />
                                <input type="date" name="end_date" defaultValue={endDate} />
                                <button type="submit">Filter</button>
                            </form>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold">New Subscriptions</h3>
                                    <p>{newSubscriptions}</p>
                                </div>
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold">Monthly Recurring Revenue (MRR)</h3>
                                    <p>${mrr}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;

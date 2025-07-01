import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface Props {
    newSubscriptions: number;
    mrr: number;
    reactivations: number;
    subscriptionGrowth: number;
    startDate: string;
    endDate: string;
}

const AdminDashboard: React.FC<Props> = ({ 
    newSubscriptions, 
    mrr, 
    reactivations, 
    subscriptionGrowth, 
    startDate, 
    endDate 
}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="bg-gray-900 text-white min-h-screen py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-gray-800 border-b border-gray-700">
                            <h2 className="font-semibold text-xl text-white leading-tight mb-6">Admin Dashboard</h2>
                            
                            {/* Date Range Selector */}
                            <div className="mb-8">
                                <form method="get" action="/admin/dashboard" className="flex gap-4 items-end">
                                    <div>
                                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-300 mb-1">
                                            Start Date
                                        </label>
                                        <input 
                                            type="date" 
                                            id="start_date"
                                            name="start_date" 
                                            defaultValue={startDate}
                                            className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-300 mb-1">
                                            End Date
                                        </label>
                                        <input 
                                            type="date"
                                            id="end_date" 
                                            name="end_date" 
                                            defaultValue={endDate}
                                            className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Filter
                                    </button>
                                </form>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">New Subscriptions</h3>
                                    <p className="text-3xl font-bold text-blue-600">{newSubscriptions}</p>
                                    <p className="text-sm text-gray-600 mt-1">New subscriptions in selected period</p>
                                </div>
                                
                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Recurring Revenue</h3>
                                    <p className="text-3xl font-bold text-green-600">${mrr.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600 mt-1">Total revenue from active subscriptions</p>
                                </div>
                                
                                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Reactivations</h3>
                                    <p className="text-3xl font-bold text-yellow-600">{reactivations}</p>
                                    <p className="text-sm text-gray-600 mt-1">Subscriptions reactivated in period</p>
                                </div>
                                
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscription Growth</h3>
                                    <p className="text-3xl font-bold text-purple-600">{subscriptionGrowth}</p>
                                    <p className="text-sm text-gray-600 mt-1">Total active subscriptions</p>
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

import React, { useState } from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

interface MealPlan {
    id: number;
    name: string;
    price: number;
    meal_types: string;
    delivery_days: string;
}

interface Subscription {
    id: number;
    meal_plan: MealPlan;
    meal_types: string[];
    delivery_days: string[];
    total_price: number;
    status: string;
    paused_from: string | null;
    paused_until: string | null;
    cancelled_at: string | null;
}

interface Props {
    subscriptions: Subscription[];
    flash: {
        success?: string;
    };
}

const Dashboard: React.FC<Props> = ({ subscriptions, flash }) => {
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        pause_from: '',
        pause_until: '',
    });

    const handlePause = (subscription: Subscription) => {
        setSelectedSubscription(subscription);
        setShowPauseModal(true);
    };

    const handleCancel = (subscription: Subscription) => {
        setSelectedSubscription(subscription);
        setShowCancelModal(true);
    };

    const handleActivate = (subscription: Subscription) => {
        router.post(route('subscription.activate', subscription.id), {}, {
            onSuccess: () => {
                // Optional: show success message
            },
        });
    };

    const submitPause = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSubscription) {
            post(route('subscription.pause', selectedSubscription.id), {
                onSuccess: () => {
                    setShowPauseModal(false);
                    reset();
                },
            });
        }
    };

    const submitCancel = () => {
        if (selectedSubscription) {
            router.post(route('subscription.cancel', selectedSubscription.id), {}, {
                onSuccess: () => {
                    setShowCancelModal(false);
                },
            });
        }
    };

    const isPaused = (subscription: Subscription): boolean => {
        return subscription.status === 'paused';
    };

    const getStatusText = (subscription: Subscription): string => {
        if (subscription.status === 'cancelled') return 'Cancelled';
        if (subscription.status === 'paused') return 'Paused';
        return 'Active';
    };

    const getStatusColor = (subscription: Subscription): string => {
        if (subscription.status === 'cancelled') return 'text-red-600';
        if (subscription.status === 'paused') return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 bg-green-800 border border-green-600 text-green-100 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-gray-800 border-b border-gray-700">
                            <h2 className="font-semibold text-xl text-white leading-tight mb-4">Your Subscriptions</h2>
                            
                            {subscriptions.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="mb-4">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">No subscriptions yet</h3>
                                    <p className="text-gray-400 mb-4">You don't have any subscriptions yet. Start your healthy meal journey today!</p>
                                    <Link 
                                        href="/subscription" 
                                        className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Browse Meal Plans
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {subscriptions.map((subscription) => (
                                        <div key={subscription.id} className="bg-gray-700 p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {subscription.meal_plan.name}
                                                </h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    subscription.status === 'cancelled' 
                                                        ? 'bg-red-100 text-red-800' 
                                                        : subscription.status === 'paused'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {getStatusText(subscription)}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-2 mb-4">
                                                <p className="text-sm text-gray-300">
                                                    <strong>Plan:</strong> {subscription.meal_plan.name} (Rp{subscription.meal_plan.price.toLocaleString('id-ID')}/meal)
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    <strong>Total Monthly Price:</strong> Rp{subscription.total_price.toLocaleString('id-ID')}
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    <strong>Meal Types:</strong> {Array.isArray(subscription.meal_types) ? subscription.meal_types.join(', ') : subscription.meal_types}
                                                </p>
                                                <p className="text-sm text-gray-300">
                                                    <strong>Delivery Days:</strong> {Array.isArray(subscription.delivery_days) ? subscription.delivery_days.join(', ') : subscription.delivery_days}
                                                </p>
                                                {subscription.status === 'paused' && subscription.paused_until && (
                                                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                                        <p className="text-sm text-yellow-800">
                                                            <strong>Paused until:</strong> {new Date(subscription.paused_until).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                                {subscription.status === 'cancelled' && (
                                                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                                                        <p className="text-sm text-red-800">
                                                            <strong>Cancelled on:</strong> {new Date(subscription.cancelled_at!).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {subscription.status !== 'cancelled' && (
                                                <div className="flex gap-2">
                                                    {subscription.status === 'paused' ? (
                                                        <button 
                                                            onClick={() => handleActivate(subscription)}
                                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                                                        >
                                                            Activate
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handlePause(subscription)}
                                                            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                                                        >
                                                            Pause
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleCancel(subscription)}
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pause Modal */}
            {showPauseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-4 text-white">Pause Subscription</h3>
                        <p className="text-gray-300 mb-4">
                            Pause your <strong className="text-white">{selectedSubscription?.meal_plan.name}</strong> subscription for a specific period.
                        </p>
                        
                        <form onSubmit={submitPause}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Pause From</label>
                                <input
                                    type="date"
                                    value={data.pause_from}
                                    onChange={(e) => setData('pause_from', e.target.value)}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.pause_from && <p className="text-red-400 text-sm mt-1">{errors.pause_from}</p>}
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Pause Until</label>
                                <input
                                    type="date"
                                    value={data.pause_until}
                                    onChange={(e) => setData('pause_until', e.target.value)}
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                                    min={data.pause_from || new Date().toISOString().split('T')[0]}
                                />
                                {errors.pause_until && <p className="text-red-400 text-sm mt-1">{errors.pause_until}</p>}
                            </div>
                            
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPauseModal(false);
                                        reset();
                                    }}
                                    className="px-4 py-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Pausing...' : 'Pause Subscription'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-gray-600">
                        <h3 className="text-lg font-semibold mb-4 text-red-400">Cancel Subscription</h3>
                        <p className="text-gray-300 mb-4">
                            Are you sure you want to cancel your <strong className="text-white">{selectedSubscription?.meal_plan.name}</strong> subscription? 
                            This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-4 py-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                            >
                                Keep Subscription
                            </button>
                            <button
                                onClick={submitCancel}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                            >
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Dashboard;

import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { type SharedData } from '@/types';

const mealPlans = [
    {
        name: 'Diet Plan',
        price: 'IDR 30.000 / meal',
        description: 'Low-calorie meals designed to help you shed pounds without sacrificing flavor.',
        image: '/storage/assets/food-example-2.png',
        details: 'Includes 5 lunches and 5 dinners per week. Average of 400-500 calories per meal. Gluten-free options available.'
    },
    {
        name: 'Protein Plan',
        price: 'IDR 40.000 / meal',
        description: 'High-protein meals to fuel your workouts and help you build lean muscle.',
        image: '/storage/assets/food-example-3.png',
        details: 'Includes 5 lunches and 5 dinners per week. Average of 600-750 calories and 40g of protein per meal.'
    },
    {
        name: 'Royal Plan',
        price: 'IDR 60.000 / meal',
        description: '100% plant-based meals that are both nutritious and delicious.',
        image: '/storage/assets/food-example-4.png',
        details: 'Includes 5 lunches and 5 dinners per week. All meals are free of meat, dairy, and other animal products.'
    },
];

interface MealPlan {
    name: string;
    price: string;
    description: string;
    image: string;
    details: string;
}

export default function Menu() {
    const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
    const { auth } = usePage<SharedData>().props;

    return (
        <GuestLayout title="Menu">
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Meal Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mealPlans.map((plan) => (
                        <div key={plan.name} className="bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <img src={plan.image} alt={plan.name} className="w-full" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-gray-400 mb-2">{plan.price}</p>
                                <p className="text-gray-400 mb-4">{plan.description}</p>
                                <button onClick={() => setSelectedPlan(plan)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium mr-2">
                                    See More Details
                                </button>
                                {auth.user ? (
                                    <Link 
                                        href="/subscription" 
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                                    >
                                        Subscribe Now
                                    </Link>
                                ) : (
                                    <Link 
                                        href="/login" 
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                                    >
                                        Login to Subscribe
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-8 max-w-lg w-full mx-4">
                        <h3 className="text-2xl font-bold mb-4">{selectedPlan.name}</h3>
                        <img src={selectedPlan.image} alt={selectedPlan.name} className="w-full rounded-md mb-4" />
                        <p className="text-gray-400 mb-2"><span className="font-bold">Price:</span> {selectedPlan.price}</p>
                        <p className="text-gray-400 mb-4"><span className="font-bold">Description:</span> {selectedPlan.description}</p>
                        <p className="text-gray-400 mb-6"><span className="font-bold">Details:</span> {selectedPlan.details}</p>
                        <button onClick={() => setSelectedPlan(null)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}

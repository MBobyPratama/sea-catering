import GuestLayout from '@/layouts/GuestLayout';
import { useState, useEffect } from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Subscription() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        plan: '30000',
        mealTypes: [] as string[],
        deliveryDays: [] as string[],
        allergies: '',
    });

    const [totalPrice, setTotalPrice] = useState(0);

    const planOptions = [
        { name: 'Diet Plan', price: '30000' },
        { name: 'Protein Plan', price: '40000' },
        { name: 'Royal Plan', price: '60000' },
    ];

    const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner'];
    const deliveryDayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const planPrice = parseInt(data.plan);
        const numMealTypes = data.mealTypes.length;
        const numDeliveryDays = data.deliveryDays.length;

        if (numMealTypes > 0 && numDeliveryDays > 0) {
            const price = planPrice * numMealTypes * numDeliveryDays * 4.3;
            setTotalPrice(price);
        } else {
            setTotalPrice(0);
        }
    }, [data]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'mealTypes' | 'deliveryDays') => {
        const { value, checked } = e.target;
        const currentValues = data[field];
        if (checked) {
            setData(field, [...currentValues, value]);
        } else {
            setData(field, currentValues.filter((item: string) => item !== value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!data.name.trim() || !data.phone.trim()) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (data.mealTypes.length === 0) {
            alert('Please select at least one meal type.');
            return;
        }
        
        if (data.deliveryDays.length === 0) {
            alert('Please select at least one delivery day.');
            return;
        }
        
        post(route('subscription.store'), {
            onSuccess: () => {
                alert('Subscription created successfully! Redirecting to your dashboard...');
                reset();
            },
            onError: (errors) => {
                console.error('Subscription error:', errors);
                alert('There was an error creating your subscription. Please try again.');
            },
        });
    };

    return (
        <GuestLayout title="Subscription">
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-4">Create Your Subscription</h2>
                <p className="text-lg text-gray-400 text-center mb-12">Customize your healthy meal plan below.</p>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                    {/* Name */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">Active Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                    </div>

                    {/* Plan Selection */}
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">Select Your Plan *</label>
                        <select
                            value={data.plan}
                            onChange={(e) => setData('plan', e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {planOptions.map(plan => (
                                <option key={plan.name} value={plan.price}>{plan.name} - Rp{parseInt(plan.price).toLocaleString('id-ID')},00 per meal</option>
                            ))}
                        </select>
                        {errors.plan && <div className="text-red-500 text-sm mt-1">{errors.plan}</div>}
                    </div>

                    {/* Meal Type */}
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">Meal Type (select at least one) *</label>
                        <div className="grid grid-cols-3 gap-4">
                            {mealTypeOptions.map(type => (
                                <label key={type} className="flex items-center space-x-2 text-white">
                                    <input
                                        type="checkbox"
                                        value={type}
                                        onChange={(e) => handleCheckboxChange(e, 'mealTypes')}
                                        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Delivery Days */}
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">Delivery Days (select at least one) *</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {deliveryDayOptions.map(day => (
                                <label key={day} className="flex items-center space-x-2 text-white">
                                    <input
                                        type="checkbox"
                                        value={day}
                                        onChange={(e) => handleCheckboxChange(e, 'deliveryDays')}
                                        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <span>{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Allergies */}
                    <div className="mb-6">
                        <label htmlFor="allergies" className="block text-white text-sm font-bold mb-2">Allergies (optional)</label>
                        <textarea
                            id="allergies"
                            rows={4}
                            value={data.allergies}
                            onChange={(e) => setData('allergies', e.target.value)}
                            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., peanuts, shellfish"
                        ></textarea>
                        {errors.allergies && <div className="text-red-500 text-sm mt-1">{errors.allergies}</div>}
                    </div>

                    {/* Total Price */}
                    <div className="mb-6 text-center">
                        <h4 className="text-2xl font-bold">Total Monthly Price</h4>
                        <p className="text-3xl font-extrabold text-green-400 mt-2">
                            Rp{totalPrice.toLocaleString('id-ID')},00
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white px-8 py-3 rounded-md font-medium text-lg"
                        >
                            {processing ? 'Processing...' : 'Subscribe Now'}
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

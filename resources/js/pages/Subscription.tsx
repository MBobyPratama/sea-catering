import GuestLayout from '@/layouts/GuestLayout';
import { useState, useEffect, FormEventHandler } from 'react';

export default function Subscription() {
    const [formData, setFormData] = useState({
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
        const planPrice = parseInt(formData.plan);
        const numMealTypes = formData.mealTypes.length;
        const numDeliveryDays = formData.deliveryDays.length;

        if (numMealTypes > 0 && numDeliveryDays > 0) {
            const price = planPrice * numMealTypes * numDeliveryDays * 4.3;
            setTotalPrice(price);
        } else {
            setTotalPrice(0);
        }
    }, [formData]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'mealTypes' | 'deliveryDays') => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const currentValues = prev[field];
            if (checked) {
                return { ...prev, [field]: [...currentValues, value] };
            } else {
                return { ...prev, [field]: currentValues.filter(item => item !== value) };
            }
        });
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // Later, this will submit to the backend.
        console.log(formData);
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
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">Active Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Plan Selection */}
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2">Select Your Plan *</label>
                        <select
                            value={formData.plan}
                            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {planOptions.map(plan => (
                                <option key={plan.name} value={plan.price}>{plan.name} - Rp{parseInt(plan.price).toLocaleString('id-ID')},00 per meal</option>
                            ))}
                        </select>
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
                            value={formData.allergies}
                            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                            className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., peanuts, shellfish"
                        ></textarea>
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
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium text-lg">
                            Subscribe Now
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}

import GuestLayout from '@/layouts/GuestLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useState, useEffect } from 'react';

interface Testimonial {
    name: string;
    review: string;
    rating: number;
}

interface Props {
    testimonials: Testimonial[];
    flash?: {
        success?: string;
    };
}

export default function Welcome({ testimonials, flash }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        review: '',
        rating: 5,
    });

    // Carousel state for food images
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const foodImages = [
        '/storage/assets/food-example-1.png',
        '/storage/assets/food-example-2.png',
        '/storage/assets/food-example-3.png',
        '/storage/assets/food-example-4.png',
    ];

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === foodImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(timer);
    }, [foodImages.length]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('testimonials.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <GuestLayout title="Welcome to SEA Catering">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16 text-center">
                {/* Food Image Carousel */}
                <div className="relative w-1/2 md:w-1/3 lg:w-1/4 mx-auto mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {foodImages.map((image, index) => (
                            <img 
                                key={index}
                                src={image} 
                                alt={`SEA Catering Food ${index + 1}`} 
                                className="w-full h-auto flex-shrink-0"
                            />
                        ))}
                    </div>
                    
                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {foodImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                    index === currentImageIndex 
                                        ? 'bg-white' 
                                        : 'bg-white/50 hover:bg-white/75'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <h2 className="text-5xl font-extrabold mb-4">Healthy Meals, Anytime, Anywhere</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    Welcome to SEA Catering, your number one source for customizable healthy meal plans. We're dedicated to giving you the very best of nutritious and delicious food, with a focus on quality, convenience, and delivery all across Indonesia.
                </p>
            </div>

            {/* Features Section */}
            <section id="features" className="bg-gray-800 py-20">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-700 p-8 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                            <img src="/storage/assets/meal-customization.png" alt="Meal Customization" className="h-24 mx-auto mb-6 rounded-md" />
                            <h4 className="text-xl font-bold mb-2">Meal Customization</h4>
                            <p className="text-gray-400">Tailor your meals to fit your dietary needs and preferences. Choose from a wide variety of ingredients and recipes.</p>
                        </div>
                        <div className="bg-gray-700 p-8 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                            <img src="/storage/assets/nationwide-delivery.png" alt="Nationwide Delivery" className="h-24 mx-auto mb-6 rounded-md" />
                            <h4 className="text-xl font-bold mb-2">Nationwide Delivery</h4>
                            <p className="text-gray-400">We deliver to all major cities across Indonesia, ensuring you get your fresh meals right at your doorstep.</p>
                        </div>
                        <div className="bg-gray-700 p-8 rounded-lg text-center transform hover:scale-105 transition-transform duration-300">
                            <img src="/storage/assets/detailed-nutritional-info.png" alt="Detailed Nutritional Info" className="h-24 mx-auto mb-6 rounded-md" />
                            <h4 className="text-xl font-bold mb-2">Detailed Nutritional Info</h4>
                            <p className="text-gray-400">Get complete nutritional information for every meal, helping you track your macros and achieve your health goals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.name} className="bg-gray-800 p-8 rounded-lg text-center">
                                <p className="text-gray-400 mb-4">"{testimonial.review}"</p>
                                <div className="flex justify-center mb-2">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <h4 className="text-xl font-bold">{testimonial.name}</h4>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <h4 className="text-2xl font-bold mb-4">Leave a Testimonial</h4>
                        {auth.user ? (
                            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                                <div className="mb-4">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div className="mb-4">
                                    <textarea 
                                        placeholder="Your Review" 
                                        rows={4} 
                                        value={data.review}
                                        onChange={(e) => setData('review', e.target.value)}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    ></textarea>
                                    {errors.review && <div className="text-red-500 text-sm mt-1">{errors.review}</div>}
                                </div>
                                <div className="mb-4">
                                    <select 
                                        value={data.rating}
                                        onChange={(e) => setData('rating', parseInt(e.target.value))}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={5}>5 Stars</option>
                                        <option value={4}>4 Stars</option>
                                        <option value={3}>3 Stars</option>
                                        <option value={2}>2 Stars</option>
                                        <option value={1}>1 Star</option>
                                    </select>
                                    {errors.rating && <div className="text-red-500 text-sm mt-1">{errors.rating}</div>}
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-md font-medium"
                                >
                                    {processing ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        ) : (
                            <div className="max-w-xl mx-auto text-center">
                                <p className="text-gray-400 mb-4">Please login to leave a testimonial</p>
                                <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-block">
                                    Login to Leave Review
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

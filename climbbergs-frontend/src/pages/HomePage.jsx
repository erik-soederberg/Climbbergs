import { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productApi.getAll();
            setProducts(data);
        } catch (err) {
            console.error('Failed to load products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={loadProducts}
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Hitta Grip Reaper-produkten
    const brush = products.find(p => p.name === "The Grip reaper");

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Gear Up for Your Next Adventure
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
                        Discover premium climbing gear designed for those who dare to reach new heights
                    </p>
                    <a href="#products" className="btn-accent inline-block">
                        Explore Products
                    </a>
                </div>
            </div>

            {/* Products Section */}
            <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Collection
                    </h2>
                    <p className="text-xl text-gray-600">
                        Click on any product to show your interest!
                    </p>
                </div>

                {/* Product Grid */}
                {brush ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ProductCard product={brush} />
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No products available yet.</p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Let us know what gear you need and we'll make it happen
                    </p>
                    <button className="btn-primary">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
}
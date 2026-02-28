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

    return (
        <div className="min-h-screen bg-white">
            {/* Minimal Hero */}
            <div className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-8 py-24 text-center">
                    <h1 className="text-5xl font-light mb-6 tracking-tight">
                        Shop
                    </h1>
                    <p className="text-lg text-gray-500 font-light">
                        Premium climbing gear
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-6xl mx-auto px-8 py-24">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <p className="text-gray-400 text-sm">NO PRODUCTS AVAILABLE</p>
                    </div>
                )}
            </div>
        </div>
    );}
import { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function ShopPage() {
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
                    <button onClick={loadProducts} className="btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Climbing Gear & Apparel
                    </h1>
                    <p className="text-xl text-gray-600">
                        Premium products for climbers, by climbers
                    </p>
                </div>
            </div>

            {/* CTA to Builder */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-primary-900 mb-2">
                                Want a Custom Hangboard?
                            </h3>
                            <p className="text-primary-700">
                                Design your perfect training board with our interactive builder
                            </p>
                        </div>
                        <a href="/" className="btn-primary whitespace-nowrap">
                            Build Now 🎨
                        </a>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No products available yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
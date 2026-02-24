import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi, interestApi } from '../services/api';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showingInterest, setShowingInterest] = useState(false);
    const [interestShown, setInterestShown] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const data = await productApi.getById(id);
            setProduct(data);
        } catch (err) {
            console.error('Failed to load product:', err);
            setError('Product not found');
        } finally {
            setLoading(false);
        }
    };

    const handleShowInterest = async () => {
        try {
            setShowingInterest(true);
            await interestApi.recordInterest(parseInt(id));
            setInterestShown(true);

            // Update interest count locally
            setProduct(prev => ({
                ...prev,
                interestCount: prev.interestCount + 1
            }));

            // Show success message for a few seconds
            setTimeout(() => {
                setInterestShown(false);
            }, 3000);
        } catch (err) {
            console.error('Failed to record interest:', err);
            alert('Failed to record interest. Please try again.');
        } finally {
            setShowingInterest(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
                    <button onClick={() => navigate('/')} className="btn-primary">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const imageUrl = product.imageUrls && product.imageUrls.length > 0
        ? product.imageUrls[0]
        : `https://via.placeholder.com/600x600/0ea5e9/ffffff?text=${encodeURIComponent(product.name)}`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Products
                </button>
            </div>

            {/* Product Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="relative bg-gray-100 aspect-square lg:aspect-auto">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/600x600/0ea5e9/ffffff?text=${encodeURIComponent(product.name)}`;
                                }}
                            />

                            {/* Interest Count Badge */}
                            {product.interestCount > 0 && (
                                <div className="absolute top-6 right-6 bg-accent text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                                    🔥 {product.interestCount} people interested
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            {/* Category */}
                            <p className="text-primary-600 font-semibold mb-2 uppercase tracking-wide">
                                {product.categoryName}
                            </p>

                            {/* Product Name */}
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="text-4xl font-bold text-gray-900 mb-6">
                                ${product.price.toFixed(2)}
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stockQuantity > 10 ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    In Stock
                  </span>
                                ) : product.stockQuantity > 0 ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Only {product.stockQuantity} left
                  </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Out of Stock
                  </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Product Details */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-8">
                                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                                <ul className="space-y-1 text-gray-600">
                                    <li><span className="font-medium">SKU:</span> {product.sku}</li>
                                    <li><span className="font-medium">Category:</span> {product.categoryName}</li>
                                    <li><span className="font-medium">Stock:</span> {product.stockQuantity} units</li>
                                </ul>
                            </div>

                            {/* Show Interest Button */}
                            <div className="space-y-4">
                                {interestShown ? (
                                    <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg text-center">
                                        <p className="font-semibold">✓ Thank you for your interest!</p>
                                        <p className="text-sm mt-1">We've recorded your interest in this product.</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleShowInterest}
                                        disabled={showingInterest}
                                        className="w-full btn-accent text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {showingInterest ? (
                                            <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Recording Interest...
                      </span>
                                        ) : (
                                            "⭐ I'm Interested in This Product!"
                                        )}
                                    </button>
                                )}

                                <p className="text-center text-sm text-gray-500">
                                    Click to let us know you're interested. We'll track demand for this product!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
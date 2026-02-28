import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    // Placeholder image if no image URL
    const imageUrl = product.imageUrls?.[0] || '/images/climbbergs_kalkborste.png';

    return (
        <Link to={`/product/${product.id}`} className="group">
            <div className="card overflow-hidden">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover product-image"
                        onError={(e) => {
                            e.target.src = `https://via.placeholder.com/400x400/0ea5e9/ffffff?text=${encodeURIComponent(product.name)}`;
                        }}
                    />

                    {/* Interest Badge (if people showed interest) */}
                    {product.interestCount > 0 && (
                        <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                            🔥 {product.interestCount} interested
                        </div>
                    )}

                    {/* Stock Badge */}
                    {product.stockQuantity < 10 && product.stockQuantity > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Only {product.stockQuantity} left
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                    {/* Category */}
                    <p className="text-sm text-primary-600 font-medium mb-1">
                        {product.categoryName}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Description - truncated */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
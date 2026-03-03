import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const imageUrl = product.imageUrls && product.imageUrls.length > 0
        ? product.imageUrls[0]
        : `https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;

    return (
        <Link to={`/shop/product/${product.id}`} className="group">
            <div className="border border-gray-200 transition-all hover:border-gray-900">
                {/* Image */}
                <div className="relative bg-gray-50 aspect-square overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.src = `https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
                        }}
                    />
                </div>

                {/* Info */}
                <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2 tracking-wide">
                        {product.categoryName.toUpperCase()}
                    </p>
                    <h3 className="text-base font-normal mb-2">
                        {product.name}
                    </h3>
                    <p className="text-xl font-light text-gray-900">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
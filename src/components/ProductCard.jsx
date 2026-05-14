import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-surface rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] block"
    >
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <img
          src={product.thumbnail || '/placeholder-image.jpg'}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-danger-custom text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.availabilityStatus === 'In Stock'
              ? 'bg-success-custom text-white'
              : 'bg-gray-500 text-white'
          }`}>
            {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-text-primary font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-text-secondary text-sm">{product.brand}</p>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-text-secondary text-sm">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-text-primary font-bold text-xl">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-text-secondary text-sm line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-2 px-4 rounded-[var(--radius)] font-semibold text-sm hover:bg-primary-dark transition-colors duration-200"
          >
            Add to Cart
          </button>
          <button className="bg-surface border border-primary text-primary py-2 px-4 rounded-[var(--radius)] font-semibold text-sm hover:bg-background transition-colors duration-200">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
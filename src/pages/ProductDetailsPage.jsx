import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setProduct(data);
      setSelectedImage(0);

      // Fetch related products from the same category
      if (data.category) {
        const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}?limit=4`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedProducts(relatedData.products.filter(p => p.id !== data.id));
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Loader />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <svg className="w-16 h-16 text-danger-custom mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Product Not Found</h2>
            <p className="text-text-secondary mb-4">{error || 'The product you are looking for does not exist.'}</p>
            <Link
              to="/products"
              className="bg-primary text-white px-6 py-3 rounded-[var(--radius)] font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link>
          <span className="mx-2 text-text-secondary">/</span>
          <Link to="/products" className="text-text-secondary hover:text-primary transition-colors">Products</Link>
          <span className="mx-2 text-text-secondary">/</span>
          <span className="text-text-primary">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-[var(--radius)] overflow-hidden bg-surface shadow-[var(--shadow)]">
              <img
                src={product.images?.[selectedImage] || product.thumbnail || '/placeholder-image.jpg'}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-[var(--radius)] overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary shadow-lg'
                        : 'border-border-custom hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">{product.title}</h1>
              <p className="text-text-secondary text-lg">{product.brand}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-text-secondary">({product.rating})</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-text-primary">${product.price}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-text-secondary text-xl line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="bg-danger-custom text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">Category:</span>
                <span className="text-text-secondary capitalize">{product.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">SKU:</span>
                <span className="text-text-secondary">{product.sku || product.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary">Stock:</span>
                <span className={`font-semibold ${
                  product.availabilityStatus === 'In Stock' || product.stock > 0
                    ? 'text-success-custom'
                    : 'text-danger-custom'
                }`}>
                  {product.availabilityStatus || (product.stock > 0 ? `${product.stock} in stock` : 'Out of stock')}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-text-primary">Quantity:</label>
                <div className="flex items-center border border-border-custom rounded-[var(--radius)]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-text-primary font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full bg-primary text-white py-4 px-6 rounded-[var(--radius)] font-bold text-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-[var(--shadow)] hover:shadow-lg"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <div className="space-y-3 pt-6 border-t border-border-custom">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-success-custom mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-text-primary">Shipping Information</h4>
                  <p className="text-text-secondary text-sm">{product.shippingInformation || 'Free shipping on orders over $50'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-text-primary">Warranty</h4>
                  <p className="text-text-secondary text-sm">{product.warrantyInformation || '1 year limited warranty'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-surface rounded-[var(--radius)] shadow-[var(--shadow)] p-8 mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Description</h2>
          <p className="text-text-secondary leading-relaxed">{product.description}</p>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-surface rounded-[var(--radius)] shadow-[var(--shadow)] p-8 mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b border-border-custom last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {review.reviewerName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{review.reviewerName || 'Anonymous'}</p>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <span className="text-text-secondary text-sm">
                      {review.date ? new Date(review.date).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <p className="text-text-secondary">{review.comment || review.review || 'No comment provided'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group bg-surface rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] block"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.thumbnail || '/placeholder-image.jpg'}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-text-primary font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-text-secondary text-sm mt-1">${relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
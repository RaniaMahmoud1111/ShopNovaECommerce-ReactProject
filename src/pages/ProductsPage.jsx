import { useState, useEffect, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.products.map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <svg className="w-16 h-16 text-danger-custom mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Oops! Something went wrong</h2>
            <p className="text-text-secondary mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-primary text-white px-6 py-3 rounded-[var(--radius)] font-semibold hover:bg-primary-dark transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Our Products</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover our amazing collection of products. Find exactly what you're looking for with our advanced search and filter options.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          onSearch={setSearchTerm}
          onCategoryFilter={setSelectedCategory}
          onSort={setSortBy}
          categories={categories}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product List */}
        {loading ? <Loader /> : <ProductList products={filteredAndSortedProducts} loading={false} />}
      </div>
    </div>
  );
}
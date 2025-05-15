import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import { fetchDestinations } from '../services/destinationService';
import { useSelector } from 'react-redux';

// Icon declarations
const SearchIcon = getIcon('Search');
const FilterIcon = getIcon('SlidersHorizontal');
const StarIcon = getIcon('Star');
const StarFilledIcon = getIcon('StarHalf');
const LoadingIcon = getIcon('Loader');

// Available categories for filtering
const CATEGORIES = [
  "all",
  "electronics",
  "accessories",
  "clothing",
  "home"
];

function Home({ addToCart }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch destinations from the database
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        const data = await fetchDestinations();
        
        // Transform the destination data to match the product structure
        const transformedData = data.map(destination => ({
          id: destination.Id,
          name: destination.Name,
          price: 199.99, // Example price - in a real app, this would come from the data
          image: destination.imageUrl || "https://images.unsplash.com/photo-1500835556837-99ac94a94552",
          rating: destination.rating || 4.5,
          category: "travel",
          description: destination.description || "Explore this amazing destination"
        }));
        
        setProducts(transformedData);
        setFilteredProducts(transformedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        setError("Could not load products. Please try again later.");
        toast.error("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadDestinations();
  }, []);
  
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  // Handle search and filtering
  useEffect(() => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default featured sorting (by id in this demo)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, activeCategory, sortBy, priceRange]);
  
  // Render star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarFilledIcon key={i} className="w-4 h-4 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-surface-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm text-surface-600 dark:text-surface-400">({rating})</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!isAuthenticated && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">Please log in to access all features.</div>
      )}
      {/* Hero Section */}
      <section className="mb-12">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-r from-primary-dark to-secondary-dark">
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Discover Your Style, Define Your Space
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/80 mb-8"
              >
                Explore our curated collection of premium products designed to elevate your everyday experience.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a 
                  href="#featured-products" 
                  className="btn bg-white text-primary hover:bg-surface-100 transition-all duration-300"
                >
                  Shop Now
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Component */}
      <MainFeature addToCart={addToCart} />
      
      {/* Product Browser Section */}
      <section id="featured-products" className="mt-16">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-surface-600 dark:text-surface-400">
              Browse our collection of high-quality products
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-600"
            >
              <FilterIcon className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {/* Filter Controls */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface-50 dark:bg-surface-800 rounded-xl p-4 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <LoadingIcon className="w-10 h-10 text-primary animate-spin" />
              <span className="ml-3 text-lg">Loading products...</span>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <div className="text-red-500 mb-4">
                {getIcon('AlertCircle')({ className: "w-12 h-12 mx-auto" })}
              </div>
              <h3 className="text-xl font-medium mb-2">Error loading products</h3>
              <p className="text-surface-600 dark:text-surface-400">{error}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <div className="card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 bg-surface-100 dark:bg-surface-700 rounded-xl overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <span className="font-bold text-primary-dark dark:text-primary-light">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    {renderRating(product.rating)}
                    
                    <p className="text-surface-600 dark:text-surface-400 text-sm mt-2 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                    
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-primary w-full mt-4 py-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-surface-400 mb-4">
                {getIcon('SearchX')({ className: "w-12 h-12 mx-auto" })}
              </div>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                  setSortBy('featured');
                  setPriceRange([0, 1000]);
                }}
                className="btn btn-primary mt-4"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
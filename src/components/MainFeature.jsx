import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { fetchDestinations } from '../services/destinationService';

// Icon declarations
const ShoppingBagIcon = getIcon('ShoppingBag');
const TruckIcon = getIcon('Truck');
const HeartIcon = getIcon('Heart');
const CheckIcon = getIcon('Check');
const ArrowLeftIcon = getIcon('ArrowLeft');
const ArrowRightIcon = getIcon('ArrowRight');
const ZoomInIcon = getIcon('ZoomIn');

function MainFeature({ addToCart }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Fetch featured destinations from the database
  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        setLoading(true);
        const data = await fetchDestinations({
          orderBy: [{ field: "rating", direction: "desc" }],
          pagingInfo: { limit: 3 }
        });
        
        // Transform destinations to match the featured products format
        const transformedData = data.map(destination => {
          // Create a basic colors array if not present
          const colors = ["#4B5563", "#1E40AF", "#9D174D"];
          
          // Create sizes array
          const sizes = ["Small Group", "Private", "Family"];
          
          // Create features array from tags or set defaults
          const tags = destination.tags ? destination.tags.split(',') : [];
          const features = tags.length > 0 ? 
            tags.slice(0, 5) : 
            ["Guided tours available", "Photo opportunities", "Local experiences", "Authentic cuisine", "Cultural immersion"];
          
          // Handle images - use imageUrl if available or fallback to defaults
          const mainImage = destination.imageUrl || "https://images.unsplash.com/photo-1500835556837-99ac94a94552";
          const images = [
            mainImage,
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
          ];
          
          return {
            id: destination.Id,
            name: destination.Name || `Destination ${destination.Id}`,
            description: destination.description || "Experience this amazing destination with stunning views and cultural experiences.",
            price: 199.99, // Example price point for travel packages
            colors,
            sizes,
            images,
            features,
            rating: destination.rating || 4.7,
            reviewCount: destination.reviewCount || 120
          };
        });
        
        setFeaturedProducts(transformedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch featured destinations:", err);
        setError("Could not load featured destinations");
        toast.error("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedDestinations();
  }, []);
  
  // Get current product
  const currentProduct = featuredProducts[currentProductIndex] || {
    id: 0,
    name: "Loading...",
    description: "Please wait while we load the featured products.",
    price: 0,
    colors: ["#000000"],
    sizes: ["One Size"],
    images: ["https://images.unsplash.com/photo-1500835556837-99ac94a94552"],
    features: ["Loading features..."],
    rating: 5.0,
    reviewCount: 0
  };
  
  // Reset selections when product changes
  useEffect(() => {
    setSelectedColor(0);
    setSelectedSize(0);
    setQuantity(1);
    setCurrentImageIndex(0);
    setIsAddedToCart(false);
  }, [currentProductIndex]);
  
  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Handle next/prev product
  const goToNextProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === (featuredProducts.length - 1) ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 ? (featuredProducts.length - 1) : prevIndex - 1
    );
  };
  
  // Handle adding to cart
  const handleAddToCart = () => {
    // Create a complete product object with selected options
    const productToAdd = {
      ...currentProduct,
      selectedColor: currentProduct.colors[selectedColor],
      selectedSize: currentProduct.sizes[selectedSize],
      quantity: quantity,
      image: currentProduct.images[0] // Use first image as thumbnail
    };
    
    // Call the addToCart function from props
    addToCart(productToAdd);
    
    // Show added to cart confirmation
    setIsAddedToCart(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };
  
  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <section className="mt-16">
      {loading && (
        <div className="flex justify-center items-center py-20">
          {getIcon('Loader')({ className: "w-10 h-10 text-primary animate-spin" })}
          <span className="ml-3">Loading featured products...</span>
        </div>
      )}
      
      {error && <div className="p-4 bg-red-100 text-red-800 rounded-lg mb-4">{error}</div>}
      
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Collection</h2>
        <p className="text-surface-600 dark:text-surface-400">
          Discover our handpicked selection of premium products
        </p>
      </div>
      
      {!loading && !error && featuredProducts.length > 0 && <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft dark:shadow-neu-dark overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="p-6 lg:p-8">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-700">
              <div 
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <motion.img
                  key={`${currentProduct.id}-${currentImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentProduct.images[currentImageIndex]}
                  alt={currentProduct.name}
                  className={`w-full h-full object-contain transition-all ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={isZoomed ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  } : {}}
                />
                
                {!isZoomed && (
                  <button
                    className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-surface-700/80 rounded-full hover:bg-white dark:hover:bg-surface-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(true);
                    }}
                  >
                    <ZoomInIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="mt-4 flex space-x-2 justify-center">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-surface-300 dark:hover:border-surface-600'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${currentProduct.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Navigation Controls */}
            <div className="mt-6 flex justify-between">
              <button 
                onClick={goToPrevProduct}
                className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 flex items-center space-x-2"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              
              <button 
                onClick={goToNextProduct}
                className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 flex items-center space-x-2"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="p-6 lg:p-8 bg-surface-50 dark:bg-surface-800 rounded-t-3xl lg:rounded-t-none lg:rounded-r-3xl flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* Product Header */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-primary dark:text-primary-light mb-2">
                    <span className="inline-flex items-center">
                      ★★★★★ <span className="ml-1">{currentProduct.rating}</span>
                    </span>
                    <span className="mx-2">•</span>
                    <span>{currentProduct.reviewCount} reviews</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold">{currentProduct.name}</h2>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary-dark dark:text-primary-light">
                      ${currentProduct.price.toFixed(2)}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-600 dark:text-surface-300">
                        <HeartIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Product Description */}
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  {currentProduct.description}
                </p>
                
                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Color</h3>
                  <div className="flex space-x-3">
                    {currentProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === index 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-surface-200 dark:border-surface-600'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      >
                        {selectedColor === index && (
                          <CheckIcon className="w-5 h-5 mx-auto text-white mix-blend-difference" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {currentProduct.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all ${
                          selectedSize === index 
                            ? 'border-primary bg-primary text-white' 
                            : 'border-surface-200 dark:border-surface-600 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity Selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 rounded-l-xl border border-surface-200 dark:border-surface-600 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                      disabled={quantity <= 1}
                    >
                      {getIcon('Minus')({ className: "w-5 h-5" })}
                    </button>
                    
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1 && val <= 10) {
                          setQuantity(val);
                        }
                      }}
                      className="w-16 text-center py-2 border-t border-b border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-800"
                    />
                    
                    <button
                      onClick={incrementQuantity}
                      className="p-2 rounded-r-xl border border-surface-200 dark:border-surface-600 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                      disabled={quantity >= 10}
                    >
                      {getIcon('Plus')({ className: "w-5 h-5" })}
                    </button>
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {currentProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-surface-700 dark:text-surface-300">
                        <CheckIcon className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Shipping Info */}
                <div className="mb-6 bg-surface-100 dark:bg-surface-700 rounded-xl p-4 flex items-center space-x-3">
                  <TruckIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free shipping</p>
                    <p className="text-xs text-surface-600 dark:text-surface-400">Free standard shipping on orders over $100</p>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <div className="mt-auto">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddedToCart}
                    className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 ${
                      isAddedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-primary hover:bg-primary-dark text-white'
                    } transition-all duration-300`}
                  >
                    {isAddedToCart ? (
                      <>
                        <CheckIcon className="w-5 h-5" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>}
    </section>
  );
}

export default MainFeature;
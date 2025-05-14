import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icon declarations
const ShoppingBagIcon = getIcon('ShoppingBag');
const TruckIcon = getIcon('Truck');
const HeartIcon = getIcon('Heart');
const CheckIcon = getIcon('Check');
const ArrowLeftIcon = getIcon('ArrowLeft');
const ArrowRightIcon = getIcon('ArrowRight');
const ZoomInIcon = getIcon('ZoomIn');

// Featured products for the showcase
const FEATURED_PRODUCTS = [
  {
    id: 101,
    name: "Modern Leather Crossbody Bag",
    description: "Luxurious genuine leather crossbody bag with adjustable strap and gold-tone hardware. Features multiple compartments for organization and a sleek minimalist design.",
    price: 149.99,
    colors: ["#8B4513", "#000000", "#F5F5DC"],
    sizes: ["Small", "Medium", "Large"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "100% genuine leather",
      "Adjustable shoulder strap",
      "Multiple interior pockets",
      "Gold-tone hardware",
      "Zipper closure"
    ],
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 102,
    name: "Smart Fitness Tracker Watch",
    description: "Advanced fitness tracker with heart rate monitoring, sleep analysis, and smartphone notifications. Waterproof design with a vibrant color display and 7-day battery life.",
    price: 99.99,
    colors: ["#000000", "#1E90FF", "#FF4500"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1559311648-d9ef4f9bc471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "24/7 heart rate monitoring",
      "Sleep tracking",
      "Activity tracking with 15+ sport modes",
      "Water-resistant up to 50m",
      "Up to 7 days battery life"
    ],
    rating: 4.6,
    reviewCount: 253
  },
  {
    id: 103,
    name: "Premium Wireless Noise-Cancelling Headphones",
    description: "Studio-quality sound with advanced active noise cancellation technology. Features premium materials, cushioned ear cups, and up to 30 hours of battery life.",
    price: 249.99,
    colors: ["#000000", "#FFFFFF", "#708090"],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e736e9ae14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Active noise cancellation",
      "High-resolution audio",
      "30 hours battery life",
      "Quick charge (5 mins = 3 hours playback)",
      "Memory foam ear cushions"
    ],
    rating: 4.9,
    reviewCount: 412
  }
];

function MainFeature({ addToCart }) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  // Get current product
  const currentProduct = FEATURED_PRODUCTS[currentProductIndex];
  
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
      prevIndex === FEATURED_PRODUCTS.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 ? FEATURED_PRODUCTS.length - 1 : prevIndex - 1
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
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Collection</h2>
        <p className="text-surface-600 dark:text-surface-400">
          Discover our handpicked selection of premium products
        </p>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-3xl shadow-soft dark:shadow-neu-dark overflow-hidden">
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
      </div>
    </section>
  );
}

export default MainFeature;
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

// Icon declarations
const HomeIcon = getIcon('Home');
const SearchIcon = getIcon('Search');

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, -5, 0],
              y: [0, -5, 5, -2, 0] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: 'reverse' 
            }}
            className="text-[120px] md:text-[150px] font-bold leading-none text-primary/10 dark:text-primary/20"
          >
            404
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <SearchIcon className="w-20 h-20 text-primary/50" />
          </motion.div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <a
            href="mailto:support@shopsphere.com"
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            {getIcon('LifeBuoy')({ className: "w-5 h-5" })}
            <span>Contact Support</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;
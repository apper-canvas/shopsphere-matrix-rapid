import React from 'react';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const NotFoundIcon = getIcon('FileQuestion');

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <NotFoundIcon className="w-20 h-20 text-primary mb-6" />
      
      <h1 className="text-4xl font-bold mb-4 text-surface-800 dark:text-surface-100">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg text-surface-600 dark:text-surface-400 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
}

export default NotFound;
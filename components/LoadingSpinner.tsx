
import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-live="polite" aria-label="Loading">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
};

export default LoadingSpinner;

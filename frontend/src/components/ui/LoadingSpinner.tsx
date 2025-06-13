import React from 'react';
import { cn } from '../../utils/cn';

type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className={cn(
        "animate-spin rounded-full border-t-transparent border-primary-500", 
        sizeClasses[size],
        "border-4",
        className
      )}></div>
    </div>
  );
};

export default LoadingSpinner;
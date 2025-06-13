import React from 'react';
import { cn } from '../../utils/cn';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  className
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-success-light/20 text-success-dark',
    warning: 'bg-warning-light/20 text-warning-dark',
    danger: 'bg-danger-light/20 text-danger-dark'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
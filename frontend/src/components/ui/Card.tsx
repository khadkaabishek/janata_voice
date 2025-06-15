import React from 'react';
import { cn } from '../../utils/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
};

const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  onClick,
  hoverable = true
}) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-card overflow-hidden',
        hoverable ? 'transition-shadow duration-200 hover:shadow-card-hover' : '',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('px-4 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('px-4 py-4', className)}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('px-4 py-3 bg-gray-50', className)}>
      {children}
    </div>
  );
};

export default Card;
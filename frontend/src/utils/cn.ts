import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function for constructing class names conditionally
 * Combines clsx and tailwind-merge for efficient class generation
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with plugins
dayjs.extend(relativeTime);

/**
 * Format a date to a relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string): string => {
  return dayjs(date).fromNow();
};

/**
 * Format a date to a human-readable format (e.g., "April 15, 2025")
 */
export const formatDate = (date: string): string => {
  return dayjs(date).format('MMMM D, YYYY');
};

/**
 * Format a datetime to a human-readable format with time (e.g., "April 15, 2025, 10:30 AM")
 */
export const formatDateTime = (date: string): string => {
  return dayjs(date).format('MMMM D, YYYY, h:mm A');
};
/**
 * Calculate total price for an order
 */
export const calculateOrderTotal = (price: number, participants: number): number => {
  return price * participants;
};

/**
 * Calculate average rating from reviews
 */
export const calculateAverageRating = (reviews: { rating: number }[]): number => {
  if (!reviews.length) return 0;
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

/**
 * Calculate rating distribution
 */
export const calculateRatingDistribution = (reviews: { rating: number }[]) => {
  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });

  return Object.entries(distribution).map(([rating, count]) => ({
    rating: parseInt(rating),
    count,
    percentage: reviews.length ? (count / reviews.length) * 100 : 0,
  }));
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Distance in meters
};

/**
 * Calculate duration in hours and minutes
 */
export const calculateDurationParts = (minutes: number): { hours: number; minutes: number } => {
  return {
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  };
};

/**
 * Calculate pagination info
 */
export const calculatePagination = (
  totalItems: number,
  currentPage: number,
  pageSize: number
) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return {
    totalPages,
    currentPage,
    hasNext,
    hasPrev,
    startItem: (currentPage - 1) * pageSize + 1,
    endItem: Math.min(currentPage * pageSize, totalItems),
  };
};
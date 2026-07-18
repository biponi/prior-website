const hostName = process.env.NEXT_PUBLIC_API_URL;
const baseUrl = `${hostName}/prior`;

export const config = {
  product: {
    getProductById: (id: string) => `${baseUrl}/product/by/${id}`,
    getProducts: () => `${baseUrl}/product/all`,
    getCategories: () => `${baseUrl}/product/categories`,
    getProductsByCategory: (id: string) => `${baseUrl}/product/category/${id}`,
    getBestProducts: () => `${baseUrl}/product/best`,
    getBestSellers: (page: number = 1, limit: number = 20) =>
      `${baseUrl}/best-seller?page=${page}&limit=${limit}`,
    getTopBestSellers: (limit: number = 10) =>
      `${baseUrl}/best-seller/top?limit=${limit}`,
    getNewProducts: () => `${baseUrl}/product/latest`,
    getFilterData: () => `${baseUrl}/product/filterData`,
    searchProducts: () => `${baseUrl}/product/search`,
    getBulkProducts: () => `${baseUrl}/product/bulk`,
    getDeals: (page: number = 1, limit: number = 20, source: string = "all") =>
      `${baseUrl}/deals?page=${page}&limit=${limit}&source=${source}`,
    getTopDeals: (limit: number = 10, source: string = "all") =>
      `${baseUrl}/deals/top?limit=${limit}&source=${source}`,
  },
  order: {
    createOrder: () => `${baseUrl}/order/create`,
    getOrderDetails: (orderId: string) => `${baseUrl}/order/details/${orderId}`,
    lookupByPhone: (phone: string, page: number = 1, limit: number = 20) =>
      `${baseUrl}/order/lookup?phone=${encodeURIComponent(phone)}&page=${page}&limit=${limit}`,
  },
  customer: {
    orders: () => `${baseUrl}/customer/orders`,
    orderDetails: (orderId: string) => `${baseUrl}/customer/orders/${orderId}`,
    stats: () => `${baseUrl}/customer/stats`,
    wishlist: () => `${baseUrl}/customer/wishlist`,
    addToWishlist: () => `${baseUrl}/customer/wishlist/add`,
    removeFromWishlist: (itemId: string) =>
      `${baseUrl}/customer/wishlist/remove/${itemId}`,
    clearWishlist: () => `${baseUrl}/customer/wishlist/clear`,
    trackOrder: (orderId: string) =>
      `${baseUrl}/customer/orders/${orderId}/track`,
    reorder: (orderId: string) =>
      `${baseUrl}/customer/orders/${orderId}/reorder`,
    downloadInvoice: (orderId: string) =>
      `${baseUrl}/customer/orders/${orderId}/invoice`,
  },
  payment: {
    bkashCheckout: () => `${hostName}/bkash/bkash-checkout`,
    bkashCallback: () => `${hostName}/bkash/bkash-callback`,
  },
  contact: {
    createContactQuery: () => `${baseUrl}/customer-service/contact`,
  },
  campaign: {
    getActiveCampaign: () => `${baseUrl}/campaign/active`,
    getCampaignById: (id: string) => `${baseUrl}/campaign/active/${id}`,
    checkPrepayment: () => `${baseUrl}/campaign/check-campaign-product`,
    calculatePrepayment: () => `${baseUrl}/campaign/calculate-prepayment`,
  },
  coupon: {
    validate: () => `${baseUrl}/coupon/validate`,
    myCoupons: (phone: string) => `${baseUrl}/coupon/my/${phone}`,
    autoApply: () => `${baseUrl}/coupon/auto-apply`,
    details: (code: string) => `${baseUrl}/coupon/global/${code}`,
  },
  newsletter: {
    subscribe: () => `${baseUrl}/newsletter/subscribe`,
    unsubscribe: () => `${baseUrl}/newsletter/unsubscribe`,
    preference: (token: string) => `${baseUrl}/newsletter/preference/${token}`,
  },
};

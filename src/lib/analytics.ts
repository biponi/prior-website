/**
 * Unified Analytics Helper
 * Combines Facebook Pixel and GTM Data Layer tracking
 * All events are tracked across all platforms simultaneously
 */

import {
  trackViewContent as fbTrackViewContent,
  trackAddToCart as fbTrackAddToCart,
  trackInitiateCheckout as fbTrackInitiateCheckout,
  trackPurchase as fbTrackPurchase,
} from "./facebook-pixel";

// ============================================================================
// E-commerce Events
// ============================================================================

/**
 * Track ViewContent / view_item event
 */
export const trackViewContent = (product: any) => {
  const effectivePrice = !!product?.hasDiscount
    ? (product?.updatedPrice ?? product?.unitPrice)
    : product?.unitPrice || product?.price || 0;

  // Facebook Pixel
  fbTrackViewContent(product);

  // GTM Data Layer
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        items: [
          {
            item_id: product?.id,
            item_name: product?.name,
            item_brand: "Luxury Online Mart",
            item_category: product?.categoryName || "",
            price: effectivePrice,
            currency: "BDT",
          },
        ],
      },
    });
  }
};

/**
 * Track AddToCart event
 */
export const trackAddToCart = (item: any) => {
  const effectivePrice = !!item?.hasDiscount
    ? (item?.updatedPrice ?? item?.unitPrice)
    : item?.unitPrice || item?.price || 0;

  // Facebook Pixel
  fbTrackAddToCart(item);

  // GTM Data Layer
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        items: [
          {
            item_id: item?.id,
            item_name: item?.name,
            item_brand: "Luxury Online Mart",
            item_category: item?.categoryName || "",
            price: effectivePrice,
            currency: "BDT",
            quantity: item?.quantity || 1,
          },
        ],
      },
    });
  }
};

/**
 * Track InitiateCheckout event
 */
export const trackBeginCheckout = (
  cart: any[],
  totalValue: number,
  coupon?: string,
) => {
  const mapItem = (product: any, index: number) => {
    const effectivePrice = !!product?.hasDiscount
      ? (product?.updatedPrice ?? product?.unitPrice)
      : product?.unitPrice;
    return {
      item_id: product?.sku,
      item_name: product?.name,
      item_brand: "Luxury Online Mart",
      item_category: product?.categoryName ?? "",
      price: effectivePrice,
      quantity: product?.quantity,
    };
  };

  // Facebook Pixel
  fbTrackInitiateCheckout(cart, totalValue, coupon);

  // GTM Data Layer
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        affiliation: "Web-Site",
        value: totalValue || 0,
        coupon: coupon || "",
        currency: "BDT",
        items: cart?.map((product, index) => ({
          ...mapItem(product, index),
          coupon: coupon || "",
          discount: product?.discount,
          index,
        })),
      },
    });
  }
};

/**
 * Track Purchase event
 */
export const trackPurchase = (order: any) => {
  // Facebook Pixel
  fbTrackPurchase(order);

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: order?.transaction_id || order?.orderNumber || "",
        affiliation: "Web-Site",
        value: order?.value || order?.totalPrice || 0,
        shipping: order?.shipping || 0,
        discount: order?.discount || 0,
        currency: order?.currency || "BDT",
        payment_type: order?.payment_type || "cod",
        items: order?.items || [],
      },
    });
  }
};

// ============================================================================
// Custom Event Tracking
// ============================================================================

/**
 * Track custom event across all platforms
 */
export const trackCustomEvent = (eventName: string, parameters?: any) => {
  // Facebook Pixel - Use trackCustom for non-standard events
  if (typeof window !== "undefined" && typeof window.fbq !== "undefined") {
    // @ts-ignore
    window.fbq("trackCustom", eventName, parameters);
  }

  // GTM Data Layer
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

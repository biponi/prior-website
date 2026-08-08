"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem, useCart } from "@/context/CartContext";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Lock,
  ShieldCheck,
  RefreshCcw,
  Truck,
  Sparkles,
  Tag,
  PackageOpen,
} from "lucide-react";
import { trackCustomEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { formatVariant } from "@/utils/functions";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart, updateToCart } = useCart();

  trackCustomEvent("view_cart", {
    currency: "BDT",
    value: cart.reduce((sum, cartdata) => {
      return (
        Number(sum) +
        Number(cartdata.quantity) *
          Number(
            cartdata?.hasDiscount
              ? (cartdata?.updatedPrice ?? cartdata?.unitPrice)
              : cartdata?.unitPrice,
          )
      );
    }, 0),
  });

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = Math.max(
      1,
      Math.min(item.maxQuantity || 999, item.quantity + change),
    );
    updateToCart({
      ...item,
      quantity: newQuantity,
      totalPrice:
        Number(
          item.hasDiscount
            ? (item.updatedPrice ?? item.unitPrice)
            : item.unitPrice,
        ) * newQuantity,
    });
  };

  const handleRemove = (index: number) => {
    removeFromCart(index);
  };

  const handleCheckoutClick = () => {
    const totalValue = cart.reduce((sum, cartdata) => {
      return (
        Number(sum) +
        Number(cartdata.quantity) *
          Number(
            cartdata?.hasDiscount
              ? (cartdata?.updatedPrice ?? cartdata?.unitPrice)
              : cartdata?.unitPrice,
          )
      );
    }, 0);
    trackCustomEvent("begin_checkout", {
      affiliation: "Web-Site",
      value: totalValue ?? 0,
      coupon: "",
      currency: "BDT",
      items: cart?.map((product, index) => {
        return {
          item_id: product?.sku,
          item_name: product?.name,
          affiliation: "Luxury Online Mart Web-site Store",
          coupon: "",
          discount: product?.discount,
          index,
          item_brand: "LuxuryOnlineMart",
          item_category: product?.categoryName ?? "",
          item_category2: "",
          item_category3: "",
          item_category4: "",
          item_category5: "",
          item_list_id: product?.id,
          item_list_name: "Related Products",
          item_variant: formatVariant(product?.variation),
          location_id: "",
          price: product?.unitPrice,
          quantity: product?.quantity,
        };
      }),
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    return sum + Number(item.quantity) * Number(item.unitPrice);
  }, 0);

  const discount = cart.reduce((sum, item) => {
    return (
      sum +
      Number(item.quantity) *
        (Number(item.unitPrice) - Number(item.updatedPrice ?? item.unitPrice))
    );
  }, 0);

  const total = cart.reduce((sum, item) => {
    return (
      sum +
      Number(item.quantity) *
        Number(
          !!item?.hasDiscount
            ? (item?.updatedPrice ?? item?.unitPrice)
            : item?.unitPrice,
        )
    );
  }, 0);

  const renderProduct = (item: CartItem, index: number) => {
    const {
      id,
      name,
      thumbnail,
      unitPrice,
      hasDiscount = false,
      updatedPrice,
      categoryName,
      quantity,
      variation,
      maxQuantity,
    } = item;

    const currentPrice = hasDiscount ? (updatedPrice ?? unitPrice) : unitPrice;
    const itemTotal = Number(currentPrice) * quantity;

    return (
      <motion.div
        key={`${id}-${variation}`}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className='group'>
        <div className='flex gap-4 py-5'>
          {/* Product Image */}
          <Link
            href={`/collections/${id}`}
            className='relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 transition-colors duration-200'>
            <Image
              fill
              src={thumbnail}
              alt={name}
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='112px'
            />
          </Link>

          {/* Product Details */}
          <div className='flex flex-1 flex-col justify-between min-w-0'>
            <div className='space-y-1.5'>
              {/* Name Row */}
              <div className='flex items-start justify-between gap-3'>
                <div className='flex-1 min-w-0'>
                  <Link
                    href={`/collections/${id}`}
                    className='font-medium text-sm text-neutral-900 hover:text-[#CD2A75] transition-colors duration-200 line-clamp-2 leading-snug'>
                    {name}
                  </Link>
                  {categoryName && (
                    <p className='text-xs text-neutral-400 mt-0.5'>
                      {categoryName}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className='text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 p-1.5 rounded-lg flex-shrink-0'
                  aria-label='Remove item'>
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>

              {/* Variant Badge */}
              {variation && (
                <div className='inline-flex items-center text-[11px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-md'>
                  {formatVariant(variation)}
                </div>
              )}

              {/* Price */}
              <div className='flex items-baseline gap-2'>
                <span className='text-sm font-semibold text-neutral-900'>
                  ৳{Number(currentPrice).toLocaleString()}
                </span>
                {hasDiscount && unitPrice > currentPrice && (
                  <span className='text-xs text-neutral-400 line-through'>
                    ৳{Number(unitPrice).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls & Item Total */}
            <div className='flex items-center justify-between mt-3'>
              <div className='flex items-center border border-neutral-200 rounded-lg overflow-hidden'>
                <button
                  onClick={() => handleQuantityChange(item, -1)}
                  disabled={quantity <= 1}
                  className='w-8 h-8 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 text-neutral-600'
                  aria-label='Decrease quantity'>
                  <Minus className='w-3.5 h-3.5' />
                </button>
                <span className='w-8 h-8 flex items-center justify-center text-sm font-medium text-neutral-900 border-x border-neutral-200'>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item, 1)}
                  disabled={quantity >= (maxQuantity || 999)}
                  className='w-8 h-8 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 text-neutral-600'
                  aria-label='Increase quantity'>
                  <Plus className='w-3.5 h-3.5' />
                </button>
              </div>

              <div className='text-right'>
                <p className='text-[11px] text-neutral-400 mb-0.5'>
                  Item total
                </p>
                <p className='text-sm font-semibold text-neutral-900'>
                  ৳{itemTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        {index < cart.length - 1 && (
          <div className='border-t border-neutral-100' />
        )}
      </motion.div>
    );
  };

  return (
    <div className='min-h-screen bg-neutral-50'>
      <div className='max-w-5xl mx-auto px-4 py-8 sm:py-12'>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight'>
            Shopping cart
          </h1>
          <div className='inline-flex items-center gap-1.5 text-sm text-neutral-500 mt-3'>
            <ShoppingBag className='w-3.5 h-3.5' />
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </div>
        </motion.div>

        {cart.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Cart Items */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-2xl border border-neutral-200 px-5 sm:px-6'>
                <AnimatePresence mode='popLayout'>
                  {cart.map((item, index) => renderProduct(item, index))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='bg-white rounded-2xl border border-neutral-200 p-6 sticky top-6'>
                <h2 className='text-base font-semibold text-neutral-900 mb-5'>
                  Order summary
                </h2>

                <div className='space-y-3 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className='text-neutral-900 font-medium'>
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='flex justify-between text-sm'>
                      <span className='flex items-center gap-1 text-emerald-600'>
                        <Tag className='w-3.5 h-3.5' />
                        Discount
                      </span>
                      <span className='text-emerald-600 font-medium'>
                        − ৳{discount.toLocaleString()}
                      </span>
                    </motion.div>
                  )}

                  <div className='flex justify-between text-sm'>
                    <span className='text-neutral-500'>Shipping</span>
                    <span className='text-neutral-400 text-xs self-center'>
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                {/* Savings pill */}
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className='inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mb-4'>
                      <Sparkles className='w-3 h-3' />
                      You&apos;re saving ৳{discount.toLocaleString()}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className='border-t border-neutral-100 pt-4 mb-5'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm font-semibold text-neutral-900'>
                      Total
                    </span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className='text-xl font-bold text-neutral-900'>
                      ৳{total.toLocaleString()}
                    </motion.span>
                  </div>
                </div>

                <Link href='/checkout' onClick={handleCheckoutClick}>
                  <Button
                    size='lg'
                    className='w-full h-12 text-xs font-medium tracking-[0.12em] uppercase rounded-xl bg-[#CD2A75] hover:bg-[#B02462] text-white transition-all duration-300 gap-2 shadow-sm hover:shadow-md'>
                    <Lock className='w-3.5 h-3.5' />
                    Proceed to checkout
                    <ArrowRight className='w-4 h-4' />
                  </Button>
                </Link>

                <Link
                  href='/collections'
                  className='block text-center text-xs text-neutral-400 hover:text-[#CD2A75] mt-3 transition-colors duration-200 underline underline-offset-2'>
                  Continue shopping
                </Link>

                {/* Trust Badges */}
                <div className=' gap-3 mt-5 pt-5 border-t border-neutral-100 hidden'>
                  {[
                    { icon: ShieldCheck, label: "Secure payment" },
                    { icon: RefreshCcw, label: "7-day returns" },
                    { icon: Truck, label: "Fast delivery" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className='flex-1 flex flex-col items-center gap-1.5 text-center'>
                      <div className='w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center'>
                        <Icon className='w-3.5 h-3.5 text-neutral-500' />
                      </div>
                      <span className='text-[10px] text-neutral-400 leading-tight'>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className='bg-white rounded-2xl border border-neutral-200 py-20 px-6 text-center'>
            <div className='max-w-xs mx-auto flex flex-col items-center gap-4'>
              <div className='w-20 h-20 rounded-full bg-[#CD2A75]/5 flex items-center justify-center'>
                <PackageOpen className='w-9 h-9 text-[#CD2A75]/60' />
              </div>
              <div>
                <h2 className='text-lg font-semibold text-neutral-900 mb-1'>
                  Your cart is empty
                </h2>
                <p className='text-sm text-neutral-500 leading-relaxed'>
                  Looks like you haven&apos;t added anything yet. Start browsing
                  to find something you&apos;ll love.
                </p>
              </div>
              <Link href='/collections'>
                <Button
                  size='lg'
                  className='h-11 px-6 text-xs font-medium tracking-[0.12em] uppercase rounded-xl bg-[#CD2A75] hover:bg-[#B02462] text-white transition-all duration-300 gap-2 mt-2 shadow-sm hover:shadow-md'>
                  Start shopping
                  <ArrowRight className='w-4 h-4' />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

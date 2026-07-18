"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import InputNumber from "@/shared/InputNumber/InputNumber";

import PaymentMethod from "./PaymentMethod";
import { CartItem, useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { createOrder } from "@/utils/orderFunctions";
import { bkashCheckout } from "@/utils/payment";
import {
  isValidBangladeshiPhoneNumber,
  getDeliveryChargeByDistrictId,
} from "@/utils/content";
import { fetchBulkProducts } from "@/services/productServices";
import { compareProducts } from "@/utils/productComparison";
import ProductChangesDialog from "@/components/checkout/ProductChangesDialog";
import {
  Loader2,
  TrashIcon,
  User,
  LogIn,
  Disc2,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";
import UserInformation from "./userForm";
import TermsCondition from "./agreeToTerms";
import { trackCustomEvent } from "@/lib/analytics";
import useAnalytics from "@/hooks/useAnalytics";
import { Badge } from "@/components/ui/badge";
import {
  formatVariant,
  formatPrice,
  ceilPrice,
  floorPrice,
} from "@/utils/functions";
import { Textarea } from "@/components/ui/textarea";
import useCampaign from "@/hooks/useCampaign";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CouponModal } from "@/components/checkout/CouponModal";
import { useCoupon } from "@/hooks/useCoupon";
import type { Coupon as CouponType, MyCoupon } from "@/services/couponService";
import { Tag, PackageOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface UserFormData {
  name: string;
  mobileNumber: string;
  email?: string;
  district: string;
  districtId: string;
  division: string;
  address: string;
  postalCode?: string;
}

const CheckoutPage = () => {
  useAnalytics();
  const { checkPrepaymentProducts, calculatePrepaymentAmount } = useCampaign();
  const { cart, clearCart, updateToCart, removeFromCart, bulkUpdateCart } =
    useCart();
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [verifyingProducts, setVerifyingProducts] = useState(false);
  const [showChangesDialog, setShowChangesDialog] = useState(false);
  const [productChanges, setProductChanges] = useState<any[]>([]);
  const isSubmittingRef = useRef(false);

  const [orderProducts, setOrderProduct] = useState<CartItem[]>([]);
  const [transectionData, setTransectionData] = useState({
    totalPrice: 0,
    paid: 0,
    remaining: 0,
    discount: 0,
    deliveryCharge: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    mobileNumber: "",
    email: "",
    district: "",
    districtId: "",
    division: "",
    address: "",
    postalCode: "1234",
  });

  const [prePaymentAmount, setPrePaymentAmount] = useState<number>(0);
  const [hasPrepayment, setHasPrepayment] = useState<boolean>(false);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponType | null>(null);
  const [myCoupons, setMyCoupons] = useState<MyCoupon[]>([]);
  const [isLoadingMyCoupons, setIsLoadingMyCoupons] = useState(false);

  const { fetchCustomerCoupons, fetchAutoApplyCoupon } = useCoupon();

  const fetchCouponsCallback = useCallback(
    async (phone: string) => {
      setIsLoadingMyCoupons(true);
      try {
        const response = await fetchCustomerCoupons(phone);
        if (response.success) {
          setMyCoupons(response.data);
        }
      } catch (error) {
        // silently fail
      } finally {
        setIsLoadingMyCoupons(false);
      }
    },
    //eslint-disable-next-line
    [],
  );

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: authState.user?.name || prevFormData.name,
        email: authState.user?.email || prevFormData.email,
        mobileNumber: authState.user?.mobileNumber || prevFormData.mobileNumber,
        district: authState?.user?.address?.district || prevFormData.district,
        division: authState.user?.address?.division || prevFormData.division,
        address: authState.user?.address?.address || prevFormData.address,
        postalCode:
          authState?.user?.address?.postalCode || prevFormData.postalCode,
      }));
    }
  }, [authState.isAuthenticated, authState.user]);

  useEffect(() => {
    if (
      formData.mobileNumber &&
      isValidBangladeshiPhoneNumber(formData.mobileNumber)
    ) {
      fetchCouponsCallback(formData.mobileNumber);
    }
    //eslint-disable-next-line
  }, [formData.mobileNumber]);

  useEffect(() => {
    const checkAutoApply = async () => {
      if (
        !appliedCoupon &&
        formData.mobileNumber &&
        isValidBangladeshiPhoneNumber(formData.mobileNumber) &&
        transectionData.totalPrice > 0
      ) {
        try {
          const products = cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          }));

          const response = await fetchAutoApplyCoupon({
            customerPhone: formData.mobileNumber,
            orderTotal: transectionData.totalPrice,
            products,
          });

          if (response.success && response.data) {
            handleApplyCoupon(response.data);
          }
        } catch (error) {
          // silently fail
        }
      }
    };

    checkAutoApply();
    //eslint-disable-next-line
  }, [formData.mobileNumber, transectionData.totalPrice]);

  const handleApplyCoupon = (coupon: CouponType) => {
    const couponDiscount = coupon.discountAmount;
    const newRemaining =
      Number(transectionData.totalPrice) +
      Number(transectionData.deliveryCharge) -
      Number(transectionData.discount) -
      couponDiscount;

    if (newRemaining < 0) {
      Swal.fire(
        "Invalid Coupon",
        "Coupon discount exceeds order total. Please add more items or use a different coupon.",
        "error",
      );
      return;
    }

    setAppliedCoupon(coupon);
    setTransectionData((prev) => ({
      ...prev,
      remaining: ceilPrice(newRemaining),
    }));
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    const newRemaining =
      Number(transectionData.totalPrice) +
      Number(transectionData.deliveryCharge) -
      Number(transectionData.discount);
    setTransectionData((prev) => ({
      ...prev,
      remaining: ceilPrice(newRemaining),
    }));
  };

  useEffect(() => {
    const verifyCartProducts = async () => {
      if (cart.length === 0) return;

      setVerifyingProducts(true);
      try {
        const productIds = cart.map((item) => Number(item.id));
        const freshProducts = await fetchBulkProducts(productIds);
        const comparison = compareProducts(cart, freshProducts);

        if (comparison.hasChanges) {
          setProductChanges(comparison.changes);
          setShowChangesDialog(true);
          bulkUpdateCart(comparison.updatedCart);
        }
      } catch (error) {
        // silently fail
      } finally {
        setVerifyingProducts(false);
      }
    };

    verifyCartProducts();
    //eslint-disable-next-line
  }, []);

  const checkPrepaymentProductData = async () => {
    const response = await checkPrepaymentProducts(
      cart.map((item: CartItem) => item?.id),
    );
    setHasPrepayment(response?.hasPrepaymentRequirement ?? false);
  };

  const calculateOrderPrepayment = async (deliveryChargeAmount = 0) => {
    const orderItems = cart.map((item) => ({
      productId: item?.id,
      quantity: item?.quantity,
      unitPrice: item?.unitPrice,
    }));
    const deliveryCharge = deliveryChargeAmount;
    const response = await calculatePrepaymentAmount(
      orderItems,
      deliveryCharge,
    );
    setPrePaymentAmount(response?.totalPrepayment ?? 0);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChange2 = (name: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const totalPrice = formatPrice(
      cart.reduce((sum, cartdata) => {
        sum =
          Number(sum) + Number(cartdata.quantity) * Number(cartdata.unitPrice);
        return sum;
      }, 0),
    );
    const discount = floorPrice(
      cart.reduce((sum, cartdata) => {
        sum =
          Number(sum) +
          (Number(cartdata.unitPrice) - Number(cartdata.updatedPrice ?? 0)) *
            cartdata.quantity;
        return sum;
      }, 0),
    );
    const couponDiscount = appliedCoupon?.discountAmount || 0;
    const remaining = ceilPrice(
      Number(totalPrice) +
        Number(transectionData?.deliveryCharge) -
        discount -
        couponDiscount -
        transectionData.paid,
    );
    setTransectionData({
      ...transectionData,
      discount,
      totalPrice,
      remaining,
    });
    setOrderProduct([...cart]);
    checkPrepaymentProductData();
    //eslint-disable-next-line
  }, [cart, appliedCoupon]);

  useEffect(() => {
    if (paymentMethod === "") return;
    if (formData?.district === "" || formData.division === "") {
      Swal.fire("Oops!!", "Enter valid shipping address", "error");
    } else {
      const deliveryCharge = formData.districtId
        ? getDeliveryChargeByDistrictId(formData.districtId)
        : 150;

      const couponDiscount = appliedCoupon?.discountAmount || 0;
      const remaining = ceilPrice(
        Number(transectionData?.totalPrice) +
          Number(deliveryCharge) -
          transectionData.discount -
          couponDiscount -
          transectionData.paid,
      );
      setTransectionData({ ...transectionData, deliveryCharge, remaining });
    }
    //eslint-disable-next-line
  }, [paymentMethod, appliedCoupon]);

  useEffect(() => {
    let deliveryChargeX = transectionData?.deliveryCharge ?? 0;
    if (formData?.district === "" && formData.division === "") {
      deliveryChargeX = 0;
    } else {
      deliveryChargeX = formData.districtId
        ? getDeliveryChargeByDistrictId(formData.districtId)
        : 150;

      const couponDiscount = appliedCoupon?.discountAmount || 0;
      const remaining = ceilPrice(
        Number(transectionData?.totalPrice) +
          Number(deliveryChargeX) -
          transectionData.discount -
          couponDiscount -
          transectionData.paid,
      );
      setTransectionData({
        ...transectionData,
        deliveryCharge: deliveryChargeX,
        remaining,
      });
      if (hasPrepayment) calculateOrderPrepayment(deliveryChargeX);
    }
    //eslint-disable-next-line
  }, [formData?.district, appliedCoupon]);

  const renderProduct = (item: CartItem, index: number) => {
    const {
      name,
      thumbnail,
      quantity,
      id,
      unitPrice,
      categoryName,
      maxQuantity,
      variation,
      hasDiscount,
      updatedPrice,
    } = item;

    const currentPrice = hasDiscount ? (updatedPrice ?? unitPrice) : unitPrice;
    const itemTotal = Number(currentPrice) * quantity;

    return (
      <motion.div
        key={`${id}-${variation}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        className='group'>
        <div className='flex gap-3 sm:gap-4 py-4'>
          {/* Product Image */}
          <Link
            href={`/collections/${id}`}
            className='relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-50 border border-neutral-100 hover:border-neutral-200 transition-colors duration-200'>
            <Image
              fill
              src={thumbnail}
              alt={name}
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='96px'
            />
          </Link>

          {/* Product Details */}
          <div className='flex flex-1 flex-col justify-between min-w-0'>
            <div className='space-y-1'>
              <div className='flex items-start justify-between gap-2'>
                <div className='flex-1 min-w-0'>
                  <Link
                    href={`/collections/${id}`}
                    className='font-medium text-sm text-neutral-900 hover:text-[#CD2A75] transition-colors duration-200 line-clamp-2 leading-snug'>
                    {name}
                  </Link>
                  {categoryName && (
                    <p className='text-[11px] text-neutral-400 mt-0.5'>
                      {categoryName}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className='text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 p-1.5 rounded-lg flex-shrink-0'
                  aria-label='Remove item'>
                  <TrashIcon className='w-3.5 h-3.5' />
                </button>
              </div>

              {variation && (
                <div className='inline-flex items-center text-[10px] px-1.5 py-0.5 bg-neutral-100 text-neutral-500 rounded'>
                  {formatVariant(variation)}
                </div>
              )}

              <div className='flex items-baseline gap-2'>
                <span className='text-sm font-semibold text-neutral-900'>
                  ৳{Number(currentPrice).toLocaleString()}
                </span>
                {hasDiscount && Number(unitPrice) > Number(currentPrice) && (
                  <span className='text-xs text-neutral-400 line-through'>
                    ৳{Number(unitPrice).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity & Item Total */}
            <div className='flex items-center justify-between mt-2'>
              <InputNumber
                defaultValue={quantity}
                min={1}
                max={maxQuantity}
                onChange={(value) => {
                  updateToCart({
                    ...item,
                    quantity: value,
                    totalPrice: Number(currentPrice) * Number(value),
                  });
                }}
              />
              <p className='text-sm font-semibold text-neutral-900'>
                ৳{itemTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {index < cart.length - 1 && (
          <div className='border-t border-neutral-100' />
        )}
      </motion.div>
    );
  };

  const renderLeft = () => {
    return (
      <div className='space-y-6'>
        {/* Login Prompt */}
        {!authState.isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <Card className='rounded-2xl border-neutral-200'>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center font-semibold text-neutral-900 text-base'>
                  <div className='w-8 h-8 rounded-full bg-[#CD2A75]/10 flex items-center justify-center mr-2.5'>
                    <User className='h-4 w-4 text-[#CD2A75]' />
                  </div>
                  Sign in for faster checkout
                </CardTitle>
                <CardDescription className='text-sm text-neutral-500'>
                  Auto-fill your information and track orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col sm:flex-row gap-3'>
                  <Link href='/login?redirect=/checkout' className='flex-1'>
                    <Button
                      variant='outline'
                      className='w-full font-medium rounded-xl border-neutral-200 hover:border-[#CD2A75] hover:text-[#CD2A75] hover:bg-[#CD2A75]/5 transition-all duration-300'>
                      <LogIn className='h-4 w-4 mr-2' />
                      Sign In
                    </Button>
                  </Link>
                  <Link href='/register?redirect=/checkout' className='flex-1'>
                    <Button className='w-full font-medium rounded-xl bg-[#CD2A75] hover:bg-[#B02462] text-white transition-all duration-300 shadow-sm'>
                      <User className='h-4 w-4 mr-2' />
                      Create Account
                    </Button>
                  </Link>
                </div>
                <p className='text-xs text-neutral-400 mt-3 text-center'>
                  Or continue as guest below
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Logged-in User Info */}
        {authState.isAuthenticated && authState.user && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <Card className='rounded-2xl border-neutral-200'>
              <CardHeader className='pb-3'>
                <CardTitle className='flex items-center font-semibold text-neutral-900 text-base'>
                  <div className='w-8 h-8 rounded-full bg-[#CD2A75]/10 flex items-center justify-center mr-2.5'>
                    <User className='h-4 w-4 text-[#CD2A75]' />
                  </div>
                  Welcome back, {authState.user.name?.split(" ")[0]}!
                </CardTitle>
                <CardDescription className='text-sm text-neutral-500'>
                  Your information has been auto-filled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='h-10 w-10 bg-[#CD2A75]/10 rounded-full flex items-center justify-center'>
                      <User className='h-5 w-5 text-[#CD2A75]' />
                    </div>
                    <div>
                      <p className='font-medium text-neutral-900 text-sm'>
                        {authState.user.name}
                      </p>
                      <p className='text-xs text-neutral-500'>
                        {authState.user.email || authState.user.mobileNumber}
                      </p>
                    </div>
                  </div>
                  <Link href='/account/profile'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-[#CD2A75] hover:bg-[#CD2A75]/5 rounded-lg text-xs'>
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <UserInformation
          formData={formData}
          handleInputChange={handleInputChange}
          handleInputChange2={handleInputChange2}
        />

        <div id='PaymentMethod' className='scroll-mt-24'>
          <PaymentMethod
            prePaymentAmount={
              hasPrepayment && prePaymentAmount > 0 ? prePaymentAmount : 0
            }
            deliveryCharge={transectionData?.deliveryCharge}
            paymentMethod={paymentMethod}
            handlePaymentMethodChange={(value: string) =>
              setPaymentMethod(value)
            }
          />
        </div>
      </div>
    );
  };

  const confirmOrderAndCreateOne = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setLoading(true);

    const hasPayment =
      paymentMethod === "bkash" ||
      prePaymentAmount > 0 ||
      transectionData.deliveryCharge >= 80;
    const paymentAmount =
      prePaymentAmount > 0
        ? prePaymentAmount
        : transectionData.deliveryCharge >= 80
          ? Math.min(transectionData.deliveryCharge, transectionData?.remaining)
          : 0;

    const orderData = {
      customerInformation: {
        //@ts-ignore
        customer: {
          name: formData?.name,
          phoneNumber: formData?.mobileNumber,
          email: formData?.email,
        },
        shipping: {
          division: formData?.division,
          district: formData?.district,
          address: formData?.address,
        },
      },
      notes,
      transectionData,
      products: [...orderProducts],
      hasPayment,
      couponCode: appliedCoupon?.code || undefined,
    };

    try {
      trackCustomEvent("add_payment_info", {
        payment_type: hasPayment ? "bkash" : paymentMethod,
        value:
          paymentMethod === "bkash"
            ? transectionData?.remaining
            : paymentAmount,
        currency: "BDT",
      });

      const response = await createOrder(orderData);

      if (response.success) {
        clearCart();
        trackCustomEvent("purchase", {
          transaction_id: hasPayment
            ? response?.data?.orderId
            : response.data?.order?.id,
          affiliation: "Web-Site",
          value: transectionData?.totalPrice,
          shipping: transectionData?.deliveryCharge,
          discount: transectionData?.discount,
          currency: "BDT",
        });

        const orderId = hasPayment
          ? response?.data?.orderId
          : response.data?.order?.id;

        if (hasPayment) {
          setLoading(false);
          setRedirecting(true);
          bkashCheckout(
            paymentMethod === "bkash"
              ? transectionData?.remaining
              : paymentAmount,
            orderId,
            formData?.name,
            formData?.mobileNumber,
          );
        } else {
          let timerInterval: NodeJS.Timeout;
          Swal.fire({
            title: "Order Placed Successfully",
            html: "Our agent will contact you shortly<br><br><strong>Redirecting in <b id='swal-timer'>3</b> seconds...</strong>",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: () => {
              const timer =
                Swal.getHtmlContainer()?.querySelector("#swal-timer");
              if (timer) {
                timerInterval = setInterval(() => {
                  const currentTimer = parseInt(timer.textContent || "3");
                  if (currentTimer > 0) {
                    timer.textContent = (currentTimer - 1).toString();
                  }
                }, 1000);
              }
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then(() => {
            window.location.href = `/order/${orderId}`;
          });
        }
      } else {
        Swal.fire(
          "Failed to place order",
          response.error || "Something went wrong, please try again",
          "error",
        );
        setLoading(false);
        isSubmittingRef.current = false;
      }
    } catch (error) {
      Swal.fire(
        "Failed to place order",
        "Something went wrong, please try again",
        "error",
      );
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleConfirmOrder = () => {
    if (!orderProducts || orderProducts.length < 1) {
      return Swal.fire("Oops!!", "Please select at least one product", "error");
    }

    const { name, mobileNumber } = formData || {};
    if (!name) {
      return Swal.fire("Oops!!", "Please Enter Your Name", "error");
    }

    if (!isValidBangladeshiPhoneNumber(mobileNumber)) {
      return Swal.fire("Oops!!", "Please Enter A Valid Mobile Number", "error");
    }

    const { district, division, address } = formData || {};
    if (!district || !division || !address) {
      return Swal.fire(
        "Oops!!",
        "Please enter valid shipping address",
        "error",
      );
    }

    if (!paymentMethod) {
      return Swal.fire("Oops!!", "Please select a payment method", "error");
    }

    if (!isValidBangladeshiPhoneNumber(mobileNumber)) {
      return Swal.fire("Oops!!", "Please enter a valid phone number", "error");
    }

    if (transectionData.deliveryCharge >= 80) {
      return Swal.fire({
        title: "Terms & Condition",
        text: `A prepayment of ${transectionData?.deliveryCharge} taka (delivery charge) is required for your delivery zone.`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Continue",
        denyButtonText: "Don't save",
      }).then((result) => {
        if (result.isConfirmed) {
          confirmOrderAndCreateOne();
        }
      });
    }

    confirmOrderAndCreateOne();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='min-h-screen bg-[#fafafa]'>
      <ProductChangesDialog
        open={showChangesDialog}
        onOpenChange={setShowChangesDialog}
        changes={productChanges}
        onContinue={() => setShowChangesDialog(false)}
      />

      {/* Header */}
      <div className='relative overflow-hidden bg-white border-b border-neutral-100'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#CD2A75]/[0.03] via-transparent to-[#CD2A75]/[0.02]' />
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative'>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
            <h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900'>
              Checkout
            </h1>
            <p className='text-neutral-500 text-sm mt-1.5'>
              {verifyingProducts
                ? "Verifying product availability..."
                : `${totalItems} ${totalItems === 1 ? "item" : "items"} in your order`}
            </p>
          </motion.div>
        </div>
      </div>

      <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
          {/* Left - Forms */}
          <div className='flex-1 '>{renderLeft()}</div>

          {/* Divider */}
          <div className='hidden lg:block shrink-0 w-px bg-neutral-200' />

          {/* Right - Order Summary */}
          <div className='w-full lg:w-[40%] lg:order-2'>
            <div className='lg:sticky lg:top-6'>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}>
                <Card className='rounded-2xl border-neutral-200 overflow-hidden shadow-sm'>
                  <CardHeader className='bg-gradient-to-r from-[#CD2A75]/[0.04] to-transparent border-b border-neutral-100 pb-3'>
                    <CardTitle className='text-base font-semibold text-neutral-900 flex items-center gap-2'>
                      <div className='w-1 h-5 bg-[#CD2A75] rounded-full' />
                      Order Summary
                    </CardTitle>
                    <CardDescription className='text-xs text-neutral-500'>
                      Review your items before checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='p-4 sm:p-5'>
                    {/* Cart Items */}
                    <div className='max-h-[320px] overflow-y-auto -mx-1 px-1 scrollbar-thin'>
                      <AnimatePresence>
                        {cart.length > 0 ? (
                          cart.map((item, index) => renderProduct(item, index))
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='py-10 text-center'>
                            <PackageOpen className='w-8 h-8 text-neutral-300 mx-auto mb-2' />
                            <p className='text-sm text-neutral-400'>
                              Your cart is empty
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Coupon Button */}
                    <div className='mt-4'>
                      <Button
                        disabled={
                          cart.length === 0 ||
                          !formData.mobileNumber ||
                          !isValidBangladeshiPhoneNumber(formData.mobileNumber)
                        }
                        variant='outline'
                        className='w-full text-xs font-medium rounded-xl border-neutral-200 hover:border-[#CD2A75] hover:text-[#CD2A75] hover:bg-[#CD2A75]/5 transition-all duration-300'
                        onClick={() => setIsCouponModalOpen(true)}>
                        <Tag className='h-3.5 w-3.5 mr-1.5' />
                        {appliedCoupon ? (
                          <span>
                            {appliedCoupon.code} - Save ৳
                            {appliedCoupon.discountAmount}
                          </span>
                        ) : (
                          <span>Apply Coupon</span>
                        )}
                      </Button>
                    </div>

                    {/* Price Breakdown */}
                    <div className='mt-5 space-y-2.5 pt-4 border-t border-neutral-100'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-neutral-500'>
                          Subtotal ({totalItems}{" "}
                          {totalItems === 1 ? "item" : "items"})
                        </span>
                        <span className='text-neutral-900 font-medium'>
                          ৳{formatPrice(transectionData?.totalPrice)}
                        </span>
                      </div>

                      <div className='flex justify-between text-sm'>
                        <span className='text-neutral-500'>
                          Delivery & Handling
                        </span>
                        <span className='text-neutral-900 font-medium'>
                          {transectionData?.deliveryCharge > 0
                            ? `৳${formatPrice(transectionData?.deliveryCharge)}`
                            : "Calculated next"}
                        </span>
                      </div>

                      {transectionData?.discount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className='flex justify-between text-sm'>
                          <span className='text-emerald-600'>Discount</span>
                          <span className='text-emerald-600 font-medium'>
                            -৳{transectionData?.discount}
                          </span>
                        </motion.div>
                      )}

                      {appliedCoupon && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className='flex justify-between text-sm'>
                          <span className='text-emerald-600'>
                            Coupon ({appliedCoupon.code})
                          </span>
                          <span className='text-emerald-600 font-medium'>
                            -৳{appliedCoupon.discountAmount}
                          </span>
                        </motion.div>
                      )}

                      {/* Total */}
                      <div className='flex justify-between items-center pt-3 border-t border-neutral-200'>
                        <span className='text-sm font-semibold text-neutral-900'>
                          Total
                        </span>
                        <motion.span
                          key={transectionData?.remaining}
                          initial={{ scale: 1.05 }}
                          animate={{ scale: 1 }}
                          className='text-xl font-bold text-neutral-900'>
                          ৳{transectionData?.remaining?.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>

                    {/* Savings pill */}
                    <AnimatePresence>
                      {transectionData?.discount > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className='inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mt-3'>
                          <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
                          You&apos;re saving ৳
                          {transectionData?.discount.toLocaleString()}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Notes */}
                    <div className='mt-4'>
                      <label className='text-xs font-medium text-neutral-600 mb-1.5 block'>
                        Order Notes (Optional)
                      </label>
                      <Textarea
                        className='w-full border-neutral-200 rounded-xl p-3 text-sm placeholder:text-neutral-400 focus:ring-1 focus:ring-[#CD2A75]/30 focus:border-[#CD2A75] transition-all duration-200 resize-none bg-neutral-50/50'
                        rows={3}
                        value={notes}
                        onChange={(e: any) => setNotes(e.target.value)}
                        placeholder='Delivery instructions or special requests...'
                      />
                    </div>

                    {/* Terms */}
                    <div className='mt-4 p-3 bg-[#CD2A75]/[0.03] rounded-xl border border-[#CD2A75]/10'>
                      <TermsCondition
                        checked={isTermsChecked}
                        handleTermCondition={(value: boolean) =>
                          setIsTermsChecked(value)
                        }
                      />
                    </div>

                    {/* Confirm Button */}
                    <ButtonPrimary
                      className='mt-4 w-full h-12 text-sm font-semibold tracking-wide rounded-xl bg-[#CD2A75] hover:bg-[#B02462] text-white transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={loading || !isTermsChecked || redirecting}
                      onClick={() => {
                        if (!loading) {
                          handleConfirmOrder();
                        }
                      }}>
                      <span className='flex items-center justify-center gap-2'>
                        {redirecting
                          ? "Redirecting to payment..."
                          : loading
                            ? "Processing..."
                            : `Confirm ${hasPrepayment ? "and Pay" : "Order"}`}
                        {loading && (
                          <Loader2 className='animate-spin w-4 h-4' />
                        )}
                        {redirecting && (
                          <Disc2 className='animate-spin w-4 h-4' />
                        )}
                        {!loading && !redirecting && (
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 7l5 5m0 0l-5 5m5-5H6'
                            />
                          </svg>
                        )}
                      </span>
                    </ButtonPrimary>

                    {/* Trust Badges */}
                    <div className='hidden items-center justify-center gap-4 mt-4 pt-4 border-t border-neutral-100'>
                      {[
                        { icon: ShieldCheck, label: "Secure checkout" },
                        { icon: Truck, label: "Fast delivery" },
                        { icon: RefreshCcw, label: "7-day returns" },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className='flex items-center gap-1.5 text-[10px] text-neutral-400'>
                          <Icon className='w-3 h-3' />
                          {label}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Coupon Modal */}
      <CouponModal
        open={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        appliedCoupon={appliedCoupon}
        customerPhone={formData.mobileNumber}
        orderTotal={transectionData.totalPrice}
        cartItems={cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          category: item.categoryName,
        }))}
        myCoupons={myCoupons}
        isLoadingMyCoupons={isLoadingMyCoupons}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(CheckoutPage), {
  ssr: false,
});

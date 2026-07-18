import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  Search,
  Phone,
  ClipboardList,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "How to Track Your Order - Order Tracking Guide | Luxury Online Mart",
  description:
    "Learn how to track your order on Luxury Online Mart. Step-by-step guide to check order status, delivery updates, and shipment progress for your baby products in Bangladesh.",
  keywords: [
    "track order Luxury Online Mart",
    "order tracking Bangladesh",
    "check order status",
    "delivery tracking baby products",
    "order status lookup",
    "Luxury Online Mart delivery",
    "how to track my order",
    "order tracking guide",
    "shipment status Bangladesh",
    "online order tracking",
  ],
  robots: "index, follow",
  openGraph: {
    title: "How to Track Your Order - Luxury Online Mart",
    description:
      "Step-by-step guide to track your order on Luxury Online Mart. Check your order status, delivery updates, and shipment progress.",
    siteName: brandConfig.seo.siteName,
    type: "article",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/order-tracking`,
  },
};

const steps = [
  {
    icon: ClipboardList,
    number: 1,
    title: "Place Your Order",
    description:
      "Complete your purchase on Luxury Online Mart by selecting your favourite baby products and confirming your order with your phone number.",
    details: [
      "Browse products and add items to your cart",
      "Enter your phone number at checkout",
      "Confirm your delivery address",
      "Choose your payment method",
      "Receive an order confirmation on screen",
    ],
  },
  {
    icon: Phone,
    number: 2,
    title: "Get Your Order Number",
    description:
      "After placing your order, you will receive a unique order number. Save this number for future reference.",
    details: [
      "Your order number is displayed on the confirmation page",
      "You will also receive it via SMS or email",
      "Keep it handy — you will need it to track your order",
    ],
  },
  {
    icon: Search,
    number: 3,
    title: "Go to Order Tracking Page",
    description:
      "Navigate to the Order Tracking page on our website using the link below or from the navigation menu.",
    details: [
      'Click "Track Order" in the footer under Customer Service',
      'Or visit the track-order page directly',
      "You can also use the link in your order confirmation message",
    ],
    link: {
      href: "/track-order",
      text: "Track Your Order Now",
    },
  },
  {
    icon: Phone,
    number: 4,
    title: "Enter Your Phone Number",
    description:
      "On the Order Tracking page, enter the phone number you used when placing your order. This is the number registered with your account.",
    details: [
      "Enter your 11-digit Bangladeshi phone number",
      "Use the format: 01XXXXXXXXX",
      "Click the Search button to look up your orders",
    ],
  },
  {
    icon: Package,
    number: 5,
    title: "View Your Orders",
    description:
      "If you have one order, you will be automatically redirected to the order details. If you have multiple orders, you will see a list to choose from.",
    details: [
      "Single order: auto-redirect to order details",
      "Multiple orders: select the order you want to track",
      "Each order shows order number, status, and date",
    ],
  },
  {
    icon: CheckCircle2,
    number: 6,
    title: "Track Your Delivery Status",
    description:
      "View the current status of your order. Your order will progress through several stages until it is delivered to your doorstep.",
    details: [
      "See the current status and timeline of your order",
      "View payment information and remaining balance",
      "Check delivery details and estimated arrival",
    ],
  },
];

const orderStatuses = [
  {
    icon: ClipboardList,
    status: "Pending",
    description: "Your order has been received and is awaiting confirmation.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: CheckCircle2,
    status: "Confirmed",
    description: "Your order has been confirmed and is being prepared.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Package,
    status: "Processing",
    description: "Your order is being packed and prepared for shipment.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Truck,
    status: "Shipped",
    description: "Your order is on its way to you via our delivery partner.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: MapPin,
    status: "Out for Delivery",
    description: "Your order is out for delivery and will arrive soon.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: CheckCircle2,
    status: "Delivered",
    description: "Your order has been successfully delivered to your address.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const faqs = [
  {
    question: "What phone number should I use to track my order?",
    answer:
      "Use the same phone number you provided when placing your order. This is the number linked to your account and order. If you used 01XXXXXXXXX, enter the same number.",
  },
  {
    question: "I can't find my order. What should I do?",
    answer:
      "Double-check that you are entering the correct phone number. Make sure there are no extra spaces or characters. If you still can't find your order, contact our support team with your order details.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery within Dhaka typically takes 1-3 business days. For areas outside Dhaka, delivery may take 3-7 business days depending on your location.",
  },
  {
    question: "Can I track my order without logging in?",
    answer:
      "Yes! You can track your order using just your phone number. No login is required. Simply visit the Order Tracking page and enter your registered phone number.",
  },
  {
    question: "What if I entered the wrong phone number when ordering?",
    answer:
      "Please contact our support team immediately with your order details. We will help update your phone number so you can track your order.",
  },
  {
    question: "How do I check if my payment is complete?",
    answer:
      "When you view your order details, the payment status is displayed. It will show whether your order is fully paid, partially paid, or pending payment. For Cash on Delivery, payment is collected at the time of delivery.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Track Your Order on Luxury Online Mart",
  description:
    "Step-by-step guide to track your baby products order on Luxury Online Mart using your phone number.",
  step: steps.map((step) => ({
    "@type": "HowToStep",
    name: step.title,
    text: step.description,
  })),
  totalTime: "PT5M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "BDT",
    value: "0",
  },
  supply: {
    "@type": "HowToSupply",
    name: "Phone number used for order",
  },
};

export default function OrderTrackingGuidePage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-babybloom-pink-light via-white to-pink-50">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #CD2A75 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-babybloom-pink/10 text-babybloom-pink text-sm font-medium rounded-full mb-6">
              <Package className="w-4 h-4" />
              <span className="tracking-wide uppercase">Order Tracking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How to{" "}
              <span className="text-babybloom-pink">Track Your Order</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our simple step-by-step guide to track your order on
              Luxury Online Mart. Stay updated on your delivery status in real
              time.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 50V25C240 8 480 0 720 8C960 16 1200 35 1440 25V50H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Quick Action CTA */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-babybloom-pink/5 to-pink-50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0">
                <Search className="w-8 h-8 text-babybloom-pink" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Ready to Track Your Order?
                </h2>
                <p className="text-gray-600 text-sm">
                  Enter your phone number to instantly check your order status
                  and delivery progress.
                </p>
              </div>
              <Link
                href="/track-order"
                className="inline-flex items-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-colors"
              >
                Track Order
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Step-by-Step <span className="text-babybloom-pink">Tracking Guide</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Follow these simple steps to track your order from placement
                to delivery.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-babybloom-pink/5 to-transparent border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-babybloom-pink/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-babybloom-pink">
                          {step.number}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-babybloom-pink/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-babybloom-pink" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {step.link && (
                      <div className="mt-4">
                        <Link
                          href={step.link.href}
                          className="inline-flex items-center gap-2 text-babybloom-pink font-semibold text-sm hover:underline"
                        >
                          {step.link.text}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Order Statuses Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Understanding Your <span className="text-babybloom-pink">Order Status</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Your order progresses through these stages from placement to
                delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderStatuses.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-900">{item.status}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Helpful <span className="text-babybloom-pink">Tips</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-babybloom-pink/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-babybloom-pink" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Keep Your Phone Handy
                </h3>
                <p className="text-gray-600 text-sm">
                  Always use the same phone number you provided during checkout.
                  This is how we identify your orders.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-babybloom-pink/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-babybloom-pink" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Check Payment Status
                </h3>
                <p className="text-gray-600 text-sm">
                  Your order details show whether your payment is complete or
                  pending. For Cash on Delivery, pay when you receive.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-babybloom-pink/10 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6 text-babybloom-pink" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Need Help?
                </h3>
                <p className="text-gray-600 text-sm">
                  If you have any issues tracking your order, reach out to us.
                  Our support team is here to help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Frequently Asked <span className="text-babybloom-pink">Questions</span>
              </h2>
              <p className="text-gray-600">
                Common questions about order tracking on Luxury Online Mart.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-babybloom-pink mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center">
              <MessageCircle className="w-8 h-8 text-babybloom-pink mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                Still have questions about your order?
              </p>
              <p className="text-gray-900 font-semibold">
                Call us at{" "}
                <a
                  href={brandConfig.contact.phone.link}
                  className="text-babybloom-pink hover:underline"
                >
                  {brandConfig.contact.phone.display}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

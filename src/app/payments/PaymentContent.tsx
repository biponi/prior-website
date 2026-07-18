"use client";

import React from "react";
import {
  CreditCard,
  Smartphone,
  Banknote,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Truck,
  Phone,
  Lock,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

const paymentMethods = [
  {
    icon: Banknote,
    name: "Cash on Delivery",
    nameBn: "ক্যাশ অন ডেলিভারি",
    description:
      "Pay with cash when your order arrives at your doorstep. Available all over Bangladesh.",
    available: true,
    highlight: true,
    features: [
      "Pay only when you receive the product",
      "Available nationwide",
      "No advance payment required for Dhaka",
      "150tk bKash advance for outside Dhaka",
    ],
  },
  {
    icon: Smartphone,
    name: "bKash",
    nameBn: "বিকাশ",
    description:
      "Send payment directly to our bKash account. Instant confirmation and order processing.",
    available: true,
    highlight: false,
    features: [
      "Instant payment confirmation",
      "Required for outside Dhaka orders",
      "Secure mobile payment",
      "Payment instructions provided at checkout",
    ],
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "All payment information is encrypted and processed through secure channels.",
  },
  {
    icon: ShieldCheck,
    title: "Data Protection",
    description:
      "We never store your payment card details or financial information on our servers.",
  },
  {
    icon: CheckCircle,
    title: "Order Confirmation",
    description:
      "Receive instant confirmation via SMS or Facebook Messenger after payment.",
  },
];

const PaymentContent = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-babybloom-pink-light via-white to-pink-50">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #CD2A75 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-babybloom-pink/10 text-babybloom-pink text-sm font-medium rounded-full mb-6">
              <CreditCard className="w-4 h-4" />
              <span className="tracking-wide uppercase">Payments</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Payment{" "}
              <span className="text-babybloom-pink">Methods</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We offer multiple secure payment options for your convenience.
              Choose the method that works best for you.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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

      {/* Payment Methods */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Available Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              How You Can Pay
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {paymentMethods.map((method, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border transition-all duration-300 ${
                  method.highlight
                    ? "bg-gradient-to-br from-babybloom-pink to-pink-500 text-white border-babybloom-pink shadow-lg shadow-babybloom-pink/20"
                    : "bg-white border-gray-100 hover:border-babybloom-pink/20 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    method.highlight
                      ? "bg-white/20"
                      : "bg-babybloom-pink/10"
                  }`}
                >
                  <method.icon
                    className={`w-7 h-7 ${
                      method.highlight ? "text-white" : "text-babybloom-pink"
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    method.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {method.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    method.highlight ? "text-white/70" : "text-gray-400"
                  }`}
                >
                  {method.nameBn}
                </p>
                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    method.highlight ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {method.description}
                </p>

                <ul className="space-y-2">
                  {method.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          method.highlight ? "text-white/80" : "text-green-500"
                        }`}
                      />
                      <span
                        className={
                          method.highlight ? "text-white/90" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              How Payment Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Place Your Order",
                description:
                  "Add items to cart, fill in delivery details, and select your preferred payment method at checkout.",
                icon: CreditCard,
              },
              {
                step: "2",
                title: "Confirm Payment",
                description:
                  "For bKash, follow the payment instructions. For COD, no advance payment needed inside Dhaka.",
                icon: Smartphone,
              },
              {
                step: "3",
                title: "Receive & Pay",
                description:
                  "For COD, pay when you receive your order. For bKash, your order is processed immediately.",
                icon: Truck,
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-babybloom-pink to-pink-400 flex items-center justify-center mb-4 shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="inline-block px-3 py-1 bg-babybloom-pink/10 text-babybloom-pink text-xs font-bold rounded-full mb-2">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Your Security
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              Safe & Secure Payments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {securityFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-babybloom-pink/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-babybloom-pink" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outside Dhaka Notice */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-babybloom-pink/5 to-pink-50/50 rounded-2xl p-6 md:p-8 border border-babybloom-pink/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-babybloom-pink" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    Outside Dhaka Orders
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    For orders delivered outside Dhaka, a{" "}
                    <strong>150tk advance payment via bKash</strong> is required
                    to confirm your order. The remaining amount can be paid via
                    Cash on Delivery when you receive your package.
                  </p>
                  <p className="text-sm text-gray-500">
                    This helps us confirm genuine orders and ensure reliable
                    delivery across Bangladesh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Phone className="w-10 h-10 text-babybloom-pink mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Payment Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Need help with payment or have questions about our payment methods?
              Contact us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801306915635"
                className="inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4" />
                Call +8801306915635
              </a>
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentContent;

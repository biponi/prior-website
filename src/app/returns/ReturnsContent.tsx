"use client";

import React from "react";
import {
  RotateCcw,
  RefreshCw,
  Phone,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  ShieldCheck,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

const returnSteps = [
  {
    step: "1",
    title: "Check Your Item",
    description:
      "Ensure the product is unused, in original condition, with tags and invoice intact.",
    icon: Package,
  },
  {
    step: "2",
    title: "Contact Us",
    description:
      "Call us at 01306915635 or message us on Facebook within 3 days of receiving your order.",
    icon: Phone,
  },
  {
    step: "3",
    title: "Send or Hand Over",
    description:
      "Return to the delivery agent instantly or bring to our store within 3 days.",
    icon: RotateCcw,
  },
];

const returnConditions = [
  {
    icon: CheckCircle,
    title: "Free Return Eligible",
    items: [
      "Product received in damaged condition",
      "Wrong product delivered",
      "Wrong size delivered",
      "Wrong design delivered",
    ],
    color: "green",
  },
  {
    icon: AlertCircle,
    title: "Customer-Borne Return",
    items: [
      "Changed mind about the product",
      "No longer needed",
      "Found a better option",
      "Other personal reasons",
    ],
    color: "amber",
  },
];

const exchangeSteps = [
  {
    icon: Phone,
    title: "Immediate Contact",
    description:
      "Call us at 01306915635 or message us on our official Facebook page to initiate an exchange.",
  },
  {
    icon: RefreshCw,
    title: "In-Store Exchange",
    description:
      "Bring the product to any of our outlets within 3 days of purchase for an instant exchange.",
  },
  {
    icon: Package,
    title: "Ship It Back",
    description:
      "If in-store exchange is not feasible, ship the product back to us. Note: Shipping costs are non-refundable.",
  },
];

const refundTimeline = [
  {
    day: "Day 1-3",
    title: "Report Issue",
    description: "Contact us with your order ID and issue details.",
  },
  {
    day: "Day 3-5",
    title: "Quality Check",
    description:
      "We inspect the returned product and verify all conditions are met.",
  },
  {
    day: "Day 5-7",
    title: "Refund Processed",
    description:
      "Refund is initiated to your original payment method or adjusted for next purchase.",
  },
];

const ReturnsContent = () => {
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
              <RotateCcw className="w-4 h-4" />
              <span className="tracking-wide uppercase">Hassle-Free</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Returns &{" "}
              <span className="text-babybloom-pink">Exchange</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Not satisfied with your purchase? We&apos;ve made returns and
              exchanges easy. Read on to learn how.
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

      {/* How to Return - Steps */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Simple Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              How to Return a Product
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {returnSteps.map((step, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < returnSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-babybloom-pink/20 to-babybloom-pink/5" />
                )}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-babybloom-pink to-pink-400 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <span className="inline-block px-3 py-1 bg-babybloom-pink/10 text-babybloom-pink text-xs font-bold rounded-full mb-2">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Return Policy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              Return Conditions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {returnConditions.map((condition, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 border ${
                  condition.color === "green"
                    ? "bg-green-50/50 border-green-200/50"
                    : "bg-amber-50/50 border-amber-200/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      condition.color === "green"
                        ? "bg-green-100"
                        : "bg-amber-100"
                    }`}
                  >
                    <condition.icon
                      className={`w-5 h-5 ${
                        condition.color === "green"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900">{condition.title}</h3>
                </div>
                <ul className="space-y-2">
                  {condition.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          condition.color === "green"
                            ? "text-green-500"
                            : "text-amber-500"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Important Note */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-babybloom-pink/5 rounded-2xl p-5 border border-babybloom-pink/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-babybloom-pink flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">
                    Important: 3-Day Window
                  </p>
                  <p>
                    All return claims must be communicated within{" "}
                    <strong>3 days</strong> of receiving the product. Claims
                    made after this period will not be eligible for free returns.
                    Online purchases cannot be returned at outlets and vice
                    versa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Process */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Exchange Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              How to Exchange
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {exchangeSteps.map((step, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-babybloom-pink/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-babybloom-pink/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-babybloom-pink" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Exchange Rules */}
          <div className="max-w-4xl mx-auto mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-babybloom-pink" />
              Exchange Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Exchange accepted within 3 days of purchase",
                "Exchange only applicable for size",
                "If size unavailable, choose another design from same category",
                "No monetary compensation for exchanges",
                "Items must be unused with original tags",
                "Online and outlet purchases are not interchangeable",
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-babybloom-pink flex-shrink-0 mt-0.5" />
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Refund Timeline */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Refund Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              Refund Timeline
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-babybloom-pink/20 via-babybloom-pink/10 to-transparent" />

              <div className="space-y-8">
                {refundTimeline.map((item, i) => (
                  <div
                    key={i}
                    className={`relative flex items-start gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-babybloom-pink rounded-full -translate-x-1.5 mt-2 z-10 ring-4 ring-white" />

                    <div
                      className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                        i % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
                      }`}
                    >
                      <span className="inline-block px-3 py-1 bg-babybloom-pink/10 text-babybloom-pink text-xs font-bold rounded-full mb-2">
                        {item.day}
                      </span>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Refund Conditions */}
          <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Refund Conditions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Items must be unworn, unwashed, and unused",
                "Must contain original invoice and tags",
                "Product must arrive undamaged",
                "Securely repack in original packaging",
                "Refund processed within 7 days of QC pass",
                "Cashback adjusted with refund amount",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
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
              Need to Start a Return?
            </h2>
            <p className="text-gray-600 mb-6">
              Contact us within 3 days of receiving your order for a hassle-free
              return or exchange.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801306915635"
                className="inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4" />
                Call 01306915635
              </a>
              <a
                href={brandConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReturnsContent;

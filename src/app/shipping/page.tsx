import React from "react";
import type { Metadata } from "next";
import {
  Truck,
  MapPin,
  Clock,
  CreditCard,
  Phone,
  Package,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Shipping Info - Luxury Online Mart",
  description:
    "Learn about shipping charges, delivery times, and conditions at Luxury Online Mart. Cash on delivery available across Bangladesh with fast 2-5 day delivery.",
  keywords: [
    "Luxury Online Mart shipping",
    "delivery charges Bangladesh",
    "kids fashion delivery",
    "cash on delivery Bangladesh",
    "online shopping delivery",
    "kids accessories delivery",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Shipping Info - Luxury Online Mart",
    description:
      "Shipping charges, delivery times, and conditions for Luxury Online Mart orders.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/shipping`,
  },
};

const deliveryZones = [
  {
    zone: "Inside Dhaka",
    zoneBn: "ঢাকার ভিতরে",
    charge: "BDT 80",
    chargeBn: "৮০ টাকা",
    icon: MapPin,
    highlight: true,
  },
  {
    zone: "Outside Dhaka",
    zoneBn: "ঢাকার বাইরে",
    charge: "BDT 150",
    chargeBn: "১৫০ টাকা",
    icon: Globe,
    highlight: false,
  },
];

const features = [
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    titleBn: "ক্যাশ অন ডেলিভারি",
    description:
      "Available all over Bangladesh. Pay when you receive your order.",
    descriptionBn: "বাংলাদেশের সর্বত্র পাওয়া যায়। অর্ডার পেলে পেমেন্ট করুন।",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    titleBn: "দ্রুত ডেলিভারি",
    description:
      "2 to 5 business days depending on courier response and your location.",
    descriptionBn:
      "কুরিয়ার প্রতিক্রিয়া এবং আপনার অবস্থানের উপর নির্ভর করে ২ থেকে ৫ কার্যদিবস।",
  },
  {
    icon: Truck,
    title: "Reliable Couriers",
    titleBn: "নির্ভরযোগ্য কুরিয়ার",
    description:
      "Delivery agents are determined by Luxury Online Mart to ensure safe delivery.",
    descriptionBn:
      "নিরাপদ ডেলিভারি নিশ্চিত করতে ডেলিভারি এজেন্ট লাক্সারি অনলাইন মার্ট দ্বারা নির্ধারিত হয়।",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    titleBn: "নিরাপদ প্যাকেজিং",
    description:
      "All orders are carefully packed to ensure your products arrive in perfect condition.",
    descriptionBn:
      "সকল অর্ডার আপনার পণ্য নিখুঁত অবস্থায় পৌঁছানোর জন্য সতর্কতার সাথে প্যাক করা হয়।",
  },
];

const faqItems = [
  {
    question: "Can I track my order?",
    questionBn: "আমি কি আমার অর্ডার ট্র্যাক করতে পারি?",
    answer:
      "Yes, once your order is shipped, you will receive a tracking number via SMS or Facebook Messenger.",
    answerBn:
      "হ্যাঁ, আপনার অর্ডার শিপ হওয়ার পর, আপনি SMS বা Facebook Messenger-এর মাধ্যমে একটি ট্র্যাকিং নম্বর পাবেন।",
  },
  {
    question: "What if I'm not available during delivery?",
    questionBn: "ডেলিভারির সময় আমি উপস্থিত না থাকলে কী হবে?",
    answer:
      "The delivery agent will call you. If you miss the call, please contact us to reschedule delivery.",
    answerBn:
      "ডেলিভারি এজেন্ট আপনাকে কল করবে। আপনি যদি কল মিস করেন, দয়া করে ডেলিভারি পুনর্নির্ধারণ করতে আমাদের সাথে যোগাযোগ করুন।",
  },
  {
    question: "Do you deliver on holidays?",
    questionBn: "আপনি কি ছুটির দিনে ডেলিভারি করেন?",
    answer:
      "Delivery may be available on holidays depending on courier availability. Orders placed on holidays may take additional time.",
    answerBn:
      "কুরিয়ারের উপলব্ধতার উপর নির্ভর করে ছুটির দিনে ডেলিভারি পাওয়া যেতে পারে। ছুটির দিনে দেওয়া অর্ডার অতিরিক্ত সময় নিতে পারে।",
  },
  {
    question: "Can I change my delivery address after ordering?",
    questionBn: "অর্ডার দেওয়ার পর আমি কি ডেলিভারি ঠিকানা পরিবর্তন করতে পারি?",
    answer:
      "Please contact us immediately if you need to change your delivery address. Changes can be made before the order is dispatched.",
    answerBn:
      "ডেলিভারি ঠিকানা পরিবর্তন করতে হলে দয়া করে তাৎক্ষণিকভাবে আমাদের সাথে যোগাযোগ করুন। অর্ডার প্রেরণের আগে পরিবর্তন করা যেতে পারে।",
  },
];

const ShippingInfo = () => {
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
              <Truck className="w-4 h-4" />
              <span className="tracking-wide uppercase">Delivery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Shipping{" "}
              <span className="text-babybloom-pink">Information</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, reliable delivery across Bangladesh. Learn about our
              shipping charges, delivery times, and conditions.
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

      {/* Delivery Zones */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Delivery Charges
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              Shipping Rates by Location
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {deliveryZones.map((zone) => (
              <div
                key={zone.zone}
                className={`rounded-2xl p-6 text-center transition-all duration-300 ${
                  zone.highlight
                    ? "bg-gradient-to-br from-babybloom-pink to-pink-500 text-white shadow-lg shadow-babybloom-pink/20"
                    : "bg-gray-50 border border-gray-100 hover:shadow-md"
                }`}
              >
                <zone.icon
                  className={`w-10 h-10 mx-auto mb-3 ${
                    zone.highlight ? "text-white/90" : "text-babybloom-pink"
                  }`}
                />
                <h3
                  className={`text-lg font-bold mb-1 ${
                    zone.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {zone.zone}
                </h3>
                <p
                  className={`text-sm mb-3 ${
                    zone.highlight ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {zone.zoneBn}
                </p>
                <div
                  className={`text-3xl font-bold ${
                    zone.highlight ? "text-white" : "text-babybloom-pink"
                  }`}
                >
                  {zone.charge}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    zone.highlight ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  per parcel
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-babybloom-pink/5 to-pink-50/50 rounded-2xl p-5 border border-babybloom-pink/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-babybloom-pink flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900 mb-1">
                    bKash Payment for Outside Dhaka
                  </p>
                  <p>
                    For outside Dhaka delivery, 150tk is required via bKash to
                    confirm your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              Our Shipping Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-babybloom-pink/10 flex items-center justify-center mb-4 group-hover:bg-babybloom-pink group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-babybloom-pink group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
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

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-babybloom-pink font-semibold text-sm tracking-widest uppercase">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-babybloom-pink flex-shrink-0 mt-0.5" />
                  {item.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed ml-7">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Phone className="w-10 h-10 text-babybloom-pink mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Questions About Shipping?
            </h2>
            <p className="text-gray-600 mb-6">
              Our team is here to help. Contact us for any shipping-related
              queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={brandConfig.contact.phone.link}
                className="inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4" />
                Call {brandConfig.contact.phone.display}
              </a>
              <a
                href={brandConfig.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300"
              >
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShippingInfo;

import React from "react";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RotateCcw,
  RefreshCw,
  CreditCard,
  Phone,
  Package,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Return & Refund Policy - Luxury Online Mart",
  description:
    "Read the Return, Exchange, and Refund Policy of Luxury Online Mart. Learn about return conditions, exchange process, and refund guidelines for kids fashion and accessories in Bangladesh.",
  keywords: [
    "Luxury Online Mart return policy",
    "refund policy Bangladesh",
    "exchange policy kids fashion",
    "return damaged product",
    "online shopping return Bangladesh",
    "kids clothing refund",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Return & Refund Policy - Luxury Online Mart",
    description:
      "Return conditions, exchange process, and refund guidelines for Luxury Online Mart.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/return-policy`,
  },
};

const returnItems = [
  {
    icon: Package,
    title: "Home Delivery (COD) Returns",
    titleBn: "হোম ডেলিভারি (COD) ফেরত",
    description:
      "If the PURCHASER receives the product at a damaged condition, wrong product, size or design, he may return it instantly to the delivery man. No delivery cost will be incurred for the return. If any claim arises after departure of delivery man, return of product will incur delivery cost. The claim for return must be communicated within 3 days of receiving the product.",
    descriptionBn:
      "যদি ক্রেতা ক্ষতিগ্রস্ত অবস্থায়, ভুল পণ্য, মাপ বা ডিজাইনে পণ্য পান, তাহলে তিনি এটি ডেলিভারি ম্যানকে তাৎক্ষণিকভাবে ফেরত দিতে পারেন। ফেরতের জন্য কোনো ডেলিভারি খরচ হবে না। ডেলিভারি ম্যানের প্রস্থানের পর কোনো দাবি উত্থাপিত হলে, পণ্য ফেরতের জন্য ডেলিভারি খরচ হবে। ফেরতের জন্য দাবি পণ্য প্রাপ্তির ৩ দিনের মধ্যে যোগাযোগ করতে হবে।",
    isHighlight: true,
  },
  {
    icon: CheckCircle,
    title: "Free Return Applicability",
    titleBn: "বিনামূল্যে ফেরত প্রযোজ্যতা",
    description:
      "Free return will be applicable only for products a) received at damaged condition or b) wrong product, wrong size or wrong design. In all other cases, customer must bear the delivery charge.",
    descriptionBn:
      "বিনামূল্যে ফেরত শুধুমাত্র এমন পণ্যের জন্য প্রযোজ্য যা a) ক্ষতিগ্রস্ত অবস্থায় প্রাপ্ত বা b) ভুল পণ্য, ভুল মাপ বা ভুল ডিজাইন। অন্য সব ক্ষেত্রে, গ্রাহককে ডেলিভারি চার্জ বহন করতে হবে।",
    isHighlight: false,
  },
];

const exchangeItems = [
  {
    icon: Phone,
    title: "Immediate Contact",
    titleBn: "তাৎক্ষণিক যোগাযোগ",
    description:
      "Call us at 01306915635 or message us on our official Facebook page.",
    descriptionBn:
      "01306915635 নম্বরে আমাদের কল করুন বা আমাদের অফিসিয়াল Facebook পেজে বার্তা পাঠান।",
  },
  {
    icon: RefreshCw,
    title: "In-Store Exchange",
    titleBn: "ইন-স্টোর বিনিময়",
    description:
      "Bring the product to an outlet within 3 days of purchase for an exchange.",
    descriptionBn:
      "বিনিময়ের জন্য ক্রয়ের ৩ দিনের মধ্যে পণ্যটি কোনো আউটলেটে নিয়ে আসুন।",
  },
  {
    icon: Package,
    title: "Shipping",
    titleBn: "শিপিং",
    description:
      "If in-store exchange is not feasible, you may ship the product back to us. Shipping costs are non-refundable.",
    descriptionBn:
      "যদি ইন-স্টোর বিনিময় সম্ভব না হয়, আপনি পণ্যটি আমাদের কাছে পাঠাতে পারেন। শিপিং খরচ ফেরতযোগ্য নয়।",
  },
];

const refundItems = [
  {
    icon: CreditCard,
    title: "Refund Processing",
    titleBn: "ফেরত প্রক্রিয়াকরণ",
    description:
      "Refund on valid ground will be processed within 07 days of receiving the product.",
    descriptionBn:
      "বৈধ কারণে ফেরত পণ্য প্রাপ্তির ০৭ দিনের মধ্যে প্রক্রিয়া করা হবে।",
  },
  {
    icon: AlertCircle,
    title: "Disqualification",
    titleBn: "অযোগ্যতা",
    description:
      "Refund request may be disqualified if the PURCHASER failed to receive delivery agent's phone call or reschedule delivery.",
    descriptionBn:
      "যদি ক্রেতা ডেলিভারি এজেন্টের ফোন কল গ্রহণ করতে ব্যর্থ হন বা ডেলিভারি পুনর্নির্ধারণ করেন, তাহলে ফেরতের অনুরোধ অযোগ্য ঘোষিত হতে পারে।",
  },
  {
    icon: CheckCircle,
    title: "Refund Conditions",
    titleBn: "ফেরত শর্তাবলী",
    description:
      "For claiming refund, the Items must be unworn, unwashed, and unused; must contain original invoice and tags; must be received at our end at undamaged condition.",
    descriptionBn:
      "ফেরত দাবি করতে, আইটেমগুলি অপরিধিত, ধোয়াহীন এবং অব্যবহৃত হতে হবে; মূল চালান এবং ট্যাগ থাকতে হবে; অক্ষত অবস্থায় আমাদের কাছে পৌঁছাতে হবে।",
  },
  {
    icon: Package,
    title: "Repacking",
    titleBn: "পুনঃপ্যাকিং",
    description:
      "Ensure that the product is securely repacked in its original packaging.",
    descriptionBn:
      "পণ্যটি এর মূল প্যাকেজিংয়ে নিরাপদভাবে পুনরায় প্যাক করা হয়েছে তা নিশ্চিত করুন।",
  },
];

function SectionCard({
  icon: Icon,
  title,
  titleBn,
  children,
  highlight,
}: {
  icon: React.ElementType;
  title: string;
  titleBn: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-shadow duration-300 ${
        highlight
          ? "border-babybloom-pink/20 bg-gradient-to-br from-babybloom-pink/5 to-white shadow-sm"
          : "border-gray-100 bg-white shadow-sm hover:shadow-md"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 border-b ${
          highlight
            ? "bg-babybloom-pink/10 border-babybloom-pink/10"
            : "bg-gradient-to-r from-babybloom-pink/5 to-transparent border-gray-100"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            highlight ? "bg-babybloom-pink text-white" : "bg-babybloom-pink/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${highlight ? "text-white" : "text-babybloom-pink"}`}
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{titleBn}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

const RefundAndReturnPolicy = () => {
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
              <span className="tracking-wide uppercase">Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Return &{" "}
              <span className="text-babybloom-pink">Refund Policy</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Learn about our return, exchange, and refund guidelines to ensure
              a smooth shopping experience with Luxury Online Mart.
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

      {/* Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="english" className="w-full">
            {/* Tab Header */}
            <div className="flex justify-center mb-10">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-gray-100 p-1.5">
                <TabsTrigger
                  value="english"
                  className="rounded-full px-8 py-2.5 text-sm font-semibold data-[state=active]:bg-babybloom-pink data-[state=active]:text-white transition-all duration-300"
                >
                  English
                </TabsTrigger>
                <TabsTrigger
                  value="bangla"
                  className="rounded-full px-8 py-2.5 text-sm font-semibold data-[state=active]:bg-babybloom-pink data-[state=active]:text-white transition-all duration-300"
                >
                  বাংলা
                </TabsTrigger>
              </TabsList>
            </div>

            {/* English Content */}
            <TabsContent value="english">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Return Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-babybloom-pink flex items-center justify-center">
                      <RotateCcw className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Return Policy
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {returnItems.map((item, i) => (
                      <SectionCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        titleBn={item.titleBn}
                        highlight={item.isHighlight}
                      >
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </SectionCard>
                    ))}
                  </div>
                </div>

                {/* Exchange Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-babybloom-pink flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Exchange Policy
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exchangeItems.map((item, i) => (
                      <SectionCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        titleBn={item.titleBn}
                      >
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </SectionCard>
                    ))}
                  </div>
                </div>

                {/* Refund Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-babybloom-pink flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Refund Policy
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {refundItems.map((item, i) => (
                      <SectionCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        titleBn={item.titleBn}
                      >
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </SectionCard>
                    ))}
                  </div>
                </div>

                {/* Contact Footer */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center mt-8">
                  <Phone className="w-8 h-8 text-babybloom-pink mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Need help with a return or refund?
                  </p>
                  <p className="text-gray-900 font-semibold">
                    Call us at{" "}
                    <a
                      href="tel:+8801306915635"
                      className="text-babybloom-pink hover:underline"
                    >
                      01306915635
                    </a>{" "}
                    or message us on our official{" "}
                    <a
                      href={brandConfig.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-babybloom-pink hover:underline"
                    >
                      Facebook page
                    </a>
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Bangla Content */}
            <TabsContent value="bangla">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Return Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-babybloom-pink flex items-center justify-center">
                      <RotateCcw className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      ফেরত নীতি
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {returnItems.map((item, i) => (
                      <SectionCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        titleBn={item.titleBn}
                        highlight={item.isHighlight}
                      >
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.descriptionBn}
                        </p>
                      </SectionCard>
                    ))}
                  </div>
                </div>

                {/* Exchange Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-babybloom-pink flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      বিনিময় নীতি
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {exchangeItems.map((item, i) => (
                      <SectionCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        titleBn={item.titleBn}
                      >
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.descriptionBn}
                        </p>
                      </SectionCard>
                    ))}
                  </div>
                </div>

                {/* Refund Policy */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-babybloom-pink flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      ফেরত নীতি
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {refundItems.map((item, i) => (
                      <SectionCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        titleBn={item.titleBn}
                      >
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.descriptionBn}
                        </p>
                      </SectionCard>
                    ))}
                  </div>
                </div>

                {/* Contact Footer */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center mt-8">
                  <Phone className="w-8 h-8 text-babybloom-pink mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    ফেরত বা ফেরত সম্পর্কে সাহায্য প্রয়োজন?
                  </p>
                  <p className="text-gray-900 font-semibold">
                    আমাদেরকে{" "}
                    <a
                      href="tel:+8801306915635"
                      className="text-babybloom-pink hover:underline"
                    >
                      ০১৩০৬৯১৫৬৩৫
                    </a>{" "}
                    নম্বরে কল করুন বা আমাদের অফিসিয়াল{" "}
                    <a
                      href={brandConfig.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-babybloom-pink hover:underline"
                    >
                      Facebook পেজে
                    </a>{" "}
                    বার্তা পাঠান
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default RefundAndReturnPolicy;

import React from "react";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Truck,
  RefreshCw,
  RotateCcw,
  CreditCard,
  ShieldCheck,
  Phone,
  FileText,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Terms & Conditions - Luxury Online Mart",
  description:
    "Read the Terms and Conditions for using Luxury Online Mart. Learn about delivery charges, exchange policies, return policies, and refund guidelines for kids fashion and accessories in Bangladesh.",
  keywords: [
    "Luxury Online Mart terms",
    "delivery charges Bangladesh",
    "exchange policy kids fashion",
    "return policy online shopping",
    "refund policy Bangladesh",
    "cash on delivery Bangladesh",
    "kids clothing exchange",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Terms & Conditions - Luxury Online Mart",
    description:
      "Delivery charges, exchange policies, return policies, and refund guidelines for Luxury Online Mart.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/terms-conditions`,
  },
};

const deliveryItems = [
  {
    icon: CreditCard,
    text: "Cash on Delivery: Available all over Bangladesh",
  },
  {
    icon: Truck,
    text: "150tk Required via bKash for outside Dhaka delivery",
  },
  {
    icon: Truck,
    text: "Delivery charge inside Dhaka: BDT 80 per parcel",
  },
  {
    icon: Truck,
    text: "Delivery charge outside Dhaka: BDT 150 per parcel",
  },
  {
    icon: RefreshCw,
    text: "Delivery Time: 2 to 5 days (varies depending upon courier response)",
  },
  {
    icon: ShieldCheck,
    text: "Delivery Agents: Will be determined by Luxury Online Mart",
  },
];

const exchangeItems = [
  "Exchanges are accepted within 3 days of purchase.",
  "Online purchases are not exchangeable from outlet or physical purchases are not exchangeable from online.",
  "Items must be unused, in original condition, and with the purchase receipt.",
  "Exchange is only applicable for size. If the size is unavailable, customers may choose another design from same category product.",
  "No monetary compensation is allowed for exchanges. Any additional refund amount may be adjusted with the next purchase.",
  "At the time of return ensure items are packed securely. Luxury Online Mart is not responsible for damages during return shipping.",
  "Call us at +8801306915635 or message us on our official facebook page within 24 hours with the order ID and issue details to confirm the return and receive pickup instructions.",
];

const returnItems = [
  "Return products with flaws for a refund if a replacement cannot be provided.",
  "Customers can return unwanted products but must cover delivery charges.",
  "Refunds will be processed within 7 days after the returned product is received and passes QC.",
];

const refundItems = [
  "Refunds are processed once the item is returned and QC is completed successfully.",
  "Refunds are automatically triggered upon successful cancellation.",
  "Any received cashback amount will be adjusted with the refund amount.",
];

// Bengali translations
const bnDeliveryItems = [
  {
    icon: CreditCard,
    text: "ক্যাশ অন ডেলিভারি: বাংলাদেশের সর্বত্র পাওয়া যায়",
  },
  {
    icon: Truck,
    text: "ঢাকার বাইরে ডেলিভারির জন্য বিকাশের মাধ্যমে ১৫০ টাকা প্রয়োজন",
  },
  {
    icon: Truck,
    text: "ঢাকার ভিতরে ডেলিভারি চার্জ: প্রতি পার্সেল ৮০ টাকা",
  },
  {
    icon: Truck,
    text: "ঢাকার বাইরে ডেলিভারি চার্জ: প্রতি পার্সেল ১৫০ টাকা",
  },
  {
    icon: RefreshCw,
    text: "ডেলিভারি সময়: ২ থেকে ৫ দিন (কুরিয়ার প্রতিক্রিয়ার উপর নির্ভরশীল)",
  },
  {
    icon: ShieldCheck,
    text: "ডেলিভারি এজেন্ট: লাক্সারি অনলাইন মার্ট দ্বারা নির্ধারিত হবে",
  },
];

const bnExchangeItems = [
  "ক্রয়ের ৩ দিনের মধ্যে বিনিময় গ্রহণ করা হয়।",
  "অনলাইন ক্রয় আউটলেট থেকে বিনিময়যোগ্য নয় অথবা ভৌত ক্রয় অনলাইন থেকে বিনিময়যোগ্য নয়।",
  "পণ্যগুলি অব্যবহার, আসল অবস্থায় থাকতে হবে এবং ক্রয়ের রসিদ সহ থাকতে হবে।",
  "বিনিময় শুধুমাত্র মাপের জন্য প্রযোজ্য। মাপ পাওয়া না গেলে, গ্রাহকরা একই ক্যাটাগরির পণ্য থেকে অন্য ডিজাইন বেছে নিতে পারেন।",
  "বিনিময়ের জন্য কোনো আর্থিক ক্ষতিপূরণ অনুমোদিত নয়। অতিরিক্ত ফেরত পরিমাণ পরবর্তী ক্রয়ের সাথে সমন্বয় করা যেতে পারে।",
  "ফেরত সময় পণ্যগুলি সুরক্ষিতভাবে প্যাকেজ করা নিশ্চিত করুন। ফেরত শিপিংয়ের সময় ক্ষতির জন্য লাক্সারি অনলাইন মার্ট দায়ী নয়।",
  "অর্ডার আইডি এবং সমস্যার বিস্তারিত সহ আমাদেরকে +৮৮০১৩০৬৯১৫৬৩৫ নম্বরে কল করুন বা আমাদের অফিসিয়াল ফেসবুক পেজে ২৪ ঘণ্টার মধ্যে বার্তা পাঠান ফেরত নিশ্চিত করতে এবং পিকআপের নির্দেশনা পেতে।",
];

const bnReturnItems = [
  "প্রতিস্থাপন প্রদান করা না গেলে ত্রুটিপূর্ণ পণ্য ফেরত প্রদান করে ফেরত পাওয়া যেতে পারে।",
  "গ্রাহকরা অপ্রয়োজনীয় পণ্য ফেরত দিতে পারেন তবে ডেলিভারি চার্জ বহন করতে হবে।",
  "ফেরত পণ্য গ্রহণ এবং QC পাস করার পরে ৭ দিনের মধ্যে ফেরত প্রক্রিয়া করা হবে।",
];

const bnRefundItems = [
  "পণ্য ফেরত এবং QC সফলভাবে সম্পন্ন হলে ফেরত প্রক্রিয়া করা হবে।",
  "সফল বাতিলকরণের পর স্বয়ংক্রিয়ভাবে ফেরত প্রক্রিয়া শুরু হয়।",
  "প্রাপ্ত যেকোনো ক্যাশব্যাক পরিমাণ ফেরত পরিমাণের সাথে সমন্বয় করা হবে।",
];

function SectionCard({
  icon: Icon,
  title,
  titleBn,
  children,
}: {
  icon: React.ElementType;
  title: string;
  titleBn: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-babybloom-pink/5 to-transparent border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-babybloom-pink" />
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

const TermsAndConditions = () => {
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
              <FileText className="w-4 h-4" />
              <span className="tracking-wide uppercase">Legal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms &{" "}
              <span className="text-babybloom-pink">Conditions</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome to Luxury Online Mart. By using any Luxury Online Mart
              property and its related services, products, and software, you
              agree to these Terms and Conditions.
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
                {/* Welcome Note */}
                <div className="bg-gradient-to-r from-babybloom-pink/5 to-pink-50/50 rounded-2xl p-6 md:p-8 border border-babybloom-pink/10">
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to <strong className="text-gray-900">Luxury Online Mart</strong>. The Luxury Online Mart website and its contents in social media links are combinedly referred to as{" "}
                    <strong className="text-babybloom-pink">
                      LUXURY ONLINE MART PROPERTY
                    </strong>
                    . By using any LUXURY ONLINE MART PROPERTY and its related
                    services, products, and software, you agree to the Terms and
                    Conditions.
                  </p>
                </div>

                {/* Delivery Section */}
                <SectionCard
                  icon={Truck}
                  title="Delivery Charges and Conditions"
                  titleBn="ডেলিভারি চার্জ ও শর্তাবলী"
                >
                  <ul className="space-y-3">
                    {deliveryItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Exchange Section */}
                <SectionCard
                  icon={RefreshCw}
                  title="Exchange Terms and Conditions"
                  titleBn="বিনিময় শর্তাবলী"
                >
                  <ul className="space-y-3">
                    {exchangeItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Return Section */}
                <SectionCard
                  icon={RotateCcw}
                  title="Return Policies"
                  titleBn="ফেরত নীতিমালা"
                >
                  <ul className="space-y-3">
                    {returnItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Refund Section */}
                <SectionCard
                  icon={CreditCard}
                  title="Refund Policy"
                  titleBn="ফেরত নীতি"
                >
                  <ul className="space-y-3">
                    {refundItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Contact Footer */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center mt-8">
                  <Phone className="w-8 h-8 text-babybloom-pink mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Have questions about our policies?
                  </p>
                  <p className="text-gray-900 font-semibold">
                    Call us at{" "}
                    <a
                      href="tel:+8801306915635"
                      className="text-babybloom-pink hover:underline"
                    >
                      +8801306915635
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
                {/* Welcome Note */}
                <div className="bg-gradient-to-r from-babybloom-pink/5 to-pink-50/50 rounded-2xl p-6 md:p-8 border border-babybloom-pink/10">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">লাক্সারি অনলাইন মার্ট</strong>{" "}
                    এ স্বাগতম। লাক্সারি অনলাইন মার্ট ওয়েবসাইট এবং সোশ্যাল মিডিয়া লিঙ্কে এর বিষয়বস্তুগুলো সম্মিলিতভাবে{" "}
                    <strong className="text-babybloom-pink">
                      লাক্সারি অনলাইন মার্ট সম্পত্তি
                    </strong>{" "}
                    বলা হয়। যেকোনো লাক্সারি অনলাইন মার্ট সম্পত্তি এবং এর
                    সম্পর্কিত সেবা, পণ্য এবং সফটওয়্যার ব্যবহার করে, আপনি এই
                    শর্তাবলী মেনে নিচ্ছেন।
                  </p>
                </div>

                {/* Delivery Section */}
                <SectionCard
                  icon={Truck}
                  title="Delivery Charges and Conditions"
                  titleBn="ডেলিভারি চার্জ ও শর্তাবলী"
                >
                  <ul className="space-y-3">
                    {bnDeliveryItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Exchange Section */}
                <SectionCard
                  icon={RefreshCw}
                  title="Exchange Terms and Conditions"
                  titleBn="বিনিময় শর্তাবলী"
                >
                  <ul className="space-y-3">
                    {bnExchangeItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Return Section */}
                <SectionCard
                  icon={RotateCcw}
                  title="Return Policies"
                  titleBn="ফেরত নীতিমালা"
                >
                  <ul className="space-y-3">
                    {bnReturnItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Refund Section */}
                <SectionCard
                  icon={CreditCard}
                  title="Refund Policy"
                  titleBn="ফেরত নীতি"
                >
                  <ul className="space-y-3">
                    {bnRefundItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span className="w-6 h-6 rounded-full bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-babybloom-pink">
                            {i + 1}
                          </span>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </SectionCard>

                {/* Contact Footer */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center mt-8">
                  <Phone className="w-8 h-8 text-babybloom-pink mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    আমাদের নীতিমালা সম্পর্কে প্রশ্ন আছে?
                  </p>
                  <p className="text-gray-900 font-semibold">
                    আমাদেরকে{" "}
                    <a
                      href="tel:+8801306915635"
                      className="text-babybloom-pink hover:underline"
                    >
                      +৮৮০১৩০৬৯১৫৬৩৫
                    </a>{" "}
                    নম্বরে কল করুন বা আমাদের অফিসিয়াল{" "}
                    <a
                      href={brandConfig.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-babybloom-pink hover:underline"
                    >
                      ফেসবুক পেজে
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

export default TermsAndConditions;

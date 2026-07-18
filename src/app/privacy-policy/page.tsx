import React from "react";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Database,
  Settings,
  MessageCircle,
  Lock,
  Globe,
  Clock,
  UserCheck,
  FileEdit,
  Phone,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Privacy Policy - Luxury Online Mart",
  description:
    "Read the Privacy Policy of Luxury Online Mart. Learn how we collect, use, and protect your personal data when you shop for kids fashion and accessories in Bangladesh.",
  keywords: [
    "Luxury Online Mart privacy",
    "privacy policy Bangladesh",
    "data protection kids store",
    "personal information policy",
    "online shopping privacy",
    "kids fashion data policy",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy - Luxury Online Mart",
    description:
      "Learn how Luxury Online Mart collects, uses, and protects your personal data.",
    siteName: brandConfig.seo.siteName,
    type: "website",
    locale: brandConfig.seo.locale,
  },
  alternates: {
    canonical: `${brandConfig.services.apiUrl}/privacy-policy`,
  },
};

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        label: "Personal Information",
        text: "When you place an order or contact us, we collect personal details such as your name, email address, phone number, shipping address, and payment details.",
      },
      {
        label: "Usage Data",
        text: "We collect data on how you interact with our website, such as your IP address, browser type, operating system, pages visited, and the time spent on each page.",
      },
      {
        label: "Cookies",
        text: "We use cookies to enhance your experience. Cookies help us remember your preferences and track your usage on our site.",
      },
    ],
  },
  {
    icon: Settings,
    title: "How We Use Your Information",
    content: [
      {
        label: "To Process Orders",
        text: "Your personal and payment information is used to process your orders, ship products, and send you order confirmations.",
      },
      {
        label: "Customer Support",
        text: "We use your contact information to respond to your inquiries, including those made through our Facebook Messenger chat.",
      },
      {
        label: "Improve User Experience",
        text: "We use cookies and usage data to improve our website's functionality and ensure that it meets your needs.",
      },
      {
        label: "Marketing",
        text: "With your consent, we may send promotional emails and offers related to our products and services.",
      },
    ],
  },
  {
    icon: MessageCircle,
    title: "Facebook Messenger Chat Integration",
    content: [
      {
        label: "Overview",
        text: "We use the Facebook Messenger chat plugin on our website to provide customer support and enhance communication with our visitors. By using the chat plugin, Facebook may collect certain information about your interaction with the chat, including your Facebook account details, and other data that Facebook may process.",
      },
      {
        label: "Information Collected via Facebook Messenger",
        text: "Facebook may collect information such as your name, profile picture, and any messages you exchange with us via the chat. Please refer to Facebook's Data Policy for more information on how they handle your data.",
      },
      {
        label: "How We Use Facebook Messenger Data",
        text: "We use the data collected through Facebook Messenger to provide timely customer service and answer any questions you may have. Your interaction with the Messenger chat is stored by Facebook, and we do not store your messages on our servers.",
      },
    ],
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    content: [
      {
        label: "",
        text: "We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Despite these measures, no online data transmission is guaranteed to be 100% secure. We encourage you to take steps to protect your personal information, including using strong passwords and safeguarding your login credentials.",
      },
    ],
  },
  {
    icon: Globe,
    title: "Third-Party Services",
    content: [
      {
        label: "",
        text: "Our website may contain links to third-party websites, including social media platforms like Facebook. We are not responsible for the privacy practices of these third-party websites. We encourage you to review the privacy policies of any external sites you visit.",
      },
    ],
  },
  {
    icon: Clock,
    title: "Data Retention",
    content: [
      {
        label: "",
        text: "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. For example, order information will be retained for accounting and legal compliance.",
      },
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      {
        label: "Access",
        text: "You have the right to access the personal data we hold about you.",
      },
      {
        label: "Request Correction",
        text: "You have the right to request correction of inaccurate or incomplete information.",
      },
      {
        label: "Request Deletion",
        text: "You have the right to request deletion of your personal data, except when we are required to retain it for legal purposes.",
      },
      {
        label: "Opt-out",
        text: "You have the right to opt-out of receiving promotional communications from us.",
      },
    ],
  },
  {
    icon: FileEdit,
    title: "Changes to This Privacy Policy",
    content: [
      {
        label: "",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Any changes will be posted on this page, and we will notify you of significant updates. We encourage you to review this Privacy Policy periodically.",
      },
    ],
  },
];

function PolicySection({
  icon: Icon,
  number,
  title,
  content,
}: {
  icon: React.ElementType;
  number: number;
  title: string;
  content: { label: string; text: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-babybloom-pink/5 to-transparent border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-babybloom-pink/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-babybloom-pink" />
        </div>
        <div>
          <span className="text-xs font-semibold text-babybloom-pink/60 uppercase tracking-wider">
            Section {number}
          </span>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="px-6 py-5 space-y-4">
        {content.map((item, i) => (
          <div key={i}>
            {item.label && (
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {item.label}
              </h3>
            )}
            <p className="text-gray-600 leading-relaxed text-sm">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const PrivacyPolicy = () => {
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
              <ShieldCheck className="w-4 h-4" />
              <span className="tracking-wide uppercase">Privacy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy{" "}
              <span className="text-babybloom-pink">Policy</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We value your trust and are committed to protecting your personal
              information. Learn how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Last Updated: September 16, 2024
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Note */}
            <div className="bg-gradient-to-r from-babybloom-pink/5 to-pink-50/50 rounded-2xl p-6 md:p-8 border border-babybloom-pink/10">
              <p className="text-gray-700 leading-relaxed">
                Welcome to{" "}
                <strong className="text-gray-900">
                  Luxury Online Mart
                </strong>
                . We value your trust and are committed to protecting your
                personal information. This Privacy Policy explains how we
                collect, use, and protect your data when you visit our website
                and use our services, including the Facebook Messenger chat
                feature.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                By using our website and services, you agree to the collection
                and use of your information in accordance with this Privacy
                Policy.
              </p>
            </div>

            {/* Policy Sections */}
            {sections.map((section, i) => (
              <PolicySection
                key={section.title}
                icon={section.icon}
                number={i + 1}
                title={section.title}
                content={section.content}
              />
            ))}

            {/* Contact Footer */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mt-8">
              <div className="text-center mb-6">
                <Phone className="w-8 h-8 text-babybloom-pink mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Contact Us
                </h3>
                <p className="text-gray-500 text-sm">
                  To exercise any of your rights or for questions about this
                  policy
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${brandConfig.contact.email.address}`}
                    className="text-sm font-semibold text-babybloom-pink hover:underline break-all"
                  >
                    {brandConfig.contact.email.address}
                  </a>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href={brandConfig.contact.phone.link}
                    className="text-sm font-semibold text-babybloom-pink hover:underline"
                  >
                    {brandConfig.contact.phone.display}
                  </a>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {brandConfig.contact.address.full}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;

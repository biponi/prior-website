"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Truck,
  CreditCard,
  RefreshCw,
  ShoppingBag,
  User,
  Package,
  Phone,
  Search,
} from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    id: "ordering",
    title: "Ordering",
    icon: ShoppingBag,
    questions: [
      {
        q: "How do I place an order?",
        a: "Simply browse our collections, add items to your cart, and proceed to checkout. Fill in your delivery details, choose your payment method (Cash on Delivery or bKash), and confirm your order. You'll receive an order confirmation via SMS or Facebook Messenger.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "You can modify or cancel your order before it is dispatched. Please contact us immediately at +8801306915635 or message us on our official Facebook page with your order ID. Once the order is dispatched, modifications are not possible.",
      },
      {
        q: "Do I need to create an account to place an order?",
        a: "No, you can place an order as a guest. However, creating an account allows you to track orders, save addresses, and enjoy a faster checkout experience.",
      },
      {
        q: "Is there a minimum order amount?",
        a: "No, there is no minimum order amount. You can order any quantity of products from our store.",
      },
      {
        q: "How do I apply a discount code?",
        a: "You can apply your discount code at the checkout page. Look for the 'Discount Code' or 'Promo Code' field, enter your code, and click 'Apply'. The discount will be reflected in your order total.",
      },
      {
        q: "Can I order by phone?",
        a: "Yes! You can call us at +8801306915635 to place an order over the phone. Our team will assist you with product selection and delivery details.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    icon: Truck,
    questions: [
      {
        q: "How long does delivery take?",
        a: "Delivery within Dhaka takes 2-3 business days. Outside Dhaka, delivery takes 3-5 business days depending on your location and courier response time.",
      },
      {
        q: "What are the delivery charges?",
        a: "Delivery charge inside Dhaka is BDT 80 per parcel. Delivery charge outside Dhaka is BDT 150 per parcel. For outside Dhaka orders, 150tk is required via bKash to confirm the order.",
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes, Cash on Delivery is available all over Bangladesh. You can pay when you receive your order at your doorstep.",
      },
      {
        q: "Can I change my delivery address after ordering?",
        a: "Please contact us immediately if you need to change your delivery address. Changes can be made before the order is dispatched. Once dispatched, address changes are not possible.",
      },
      {
        q: "What if I miss the delivery call?",
        a: "The delivery agent will call you before delivery. If you miss the call, please contact us at +8801306915635 to reschedule. Failed delivery attempts due to missed calls may result in order cancellation.",
      },
      {
        q: "Do you deliver on weekends and holidays?",
        a: "Delivery may be available on weekends and holidays depending on courier availability. Orders placed on holidays may take additional time for delivery.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order is shipped, you will receive a tracking number via SMS or Facebook Messenger. You can use this to track your delivery status.",
      },
      {
        q: "Which courier service do you use?",
        a: "Delivery agents are determined by Luxury Online Mart to ensure reliable and safe delivery across Bangladesh.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Cash on Delivery (COD) and bKash. Card payments and bank transfers are currently not available.",
      },
      {
        q: "Is it safe to pay online?",
        a: "Yes, our payment processes are secure. For bKash payments, you will receive a payment number and instructions during checkout. We never store your payment information.",
      },
      {
        q: "Do I need to pay in advance for outside Dhaka orders?",
        a: "Yes, for outside Dhaka delivery, a payment of 150tk via bKash is required to confirm your order. The remaining amount can be paid via Cash on Delivery.",
      },
      {
        q: "Can I pay in installments?",
        a: "Currently, we do not offer installment payment options. Full payment is required at the time of delivery for COD orders.",
      },
    ],
  },
  {
    id: "exchange",
    title: "Exchange & Returns",
    icon: RefreshCw,
    questions: [
      {
        q: "Can I exchange a product?",
        a: "Yes, exchanges are accepted within 3 days of purchase. Exchange is only applicable for size. If the size is unavailable, you may choose another design from the same category. Online purchases cannot be exchanged at outlets and vice versa.",
      },
      {
        q: "How do I return a product?",
        a: "If you receive a damaged or wrong product, you can return it instantly to the delivery man at no cost. For returns after delivery, contact us within 3 days at +8801306915635 or message us on Facebook with your order ID and issue details.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 7 days after the returned product is received and passes quality check. Refunds are automatically triggered upon successful cancellation.",
      },
      {
        q: "What conditions must returned items meet?",
        a: "Items must be unworn, unwashed, and unused. They must contain the original invoice and tags. The product must be securely repacked in its original packaging and received at our end in undamaged condition.",
      },
      {
        q: "Is the return shipping free?",
        a: "Free return is applicable only for products received at damaged condition or wrong product/size/design. In all other cases, the customer must bear the delivery charge.",
      },
      {
        q: "Can I get a cash refund?",
        a: "No monetary compensation is allowed for exchanges. Refunds are processed to your original payment method. Any cashback amount will be adjusted with the refund amount.",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    icon: Package,
    questions: [
      {
        q: "What products does Luxury Online Mart offer?",
        a: "We offer fashionable kids' wear, school essentials, and lifestyle accessories including princess dresses, everyday baby wear, party bags, school supplies, fashion accessories, and more.",
      },
      {
        q: "Are your products authentic and high quality?",
        a: "Yes, every product at Luxury Online Mart is carefully selected to ensure premium quality, comfort, and durability. We are committed to offering products that meet the needs of modern families.",
      },
      {
        q: "How do I find the right size for my child?",
        a: "Each product page includes a size guide to help you choose the perfect fit. If you need further assistance, our customer support team is happy to help via phone or Facebook.",
      },
      {
        q: "Do you restock sold-out items?",
        a: "We regularly restock popular items. If a product you want is sold out, follow us on Facebook or check back soon. You can also contact us to inquire about specific items.",
      },
      {
        q: "Are the product colors accurate on the website?",
        a: "We make every effort to display product colors accurately. However, colors may vary slightly due to screen settings and display differences.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Privacy",
    icon: User,
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on the 'Register' button at the top of the page. Fill in your name, email, phone number, and password. You'll receive a confirmation to verify your account.",
      },
      {
        q: "How do I reset my password?",
        a: "Click on 'Forgot Password' on the login page. Enter your registered email address and follow the instructions sent to your email to reset your password.",
      },
      {
        q: "Is my personal information safe?",
        a: "Yes, we take your privacy seriously. We use appropriate security measures to protect your personal information. We do not sell or share your data with third parties for marketing purposes. Read our Privacy Policy for more details.",
      },
      {
        q: "How do I delete my account?",
        a: "To delete your account, please contact us at hello@luxuryonlinemart.com with your account details. We will process your request and remove your data from our systems.",
      },
    ],
  },
  {
    id: "support",
    title: "Customer Support",
    icon: Phone,
    questions: [
      {
        q: "How can I contact customer support?",
        a: "You can reach us via phone at +8801306915635, email at hello@luxuryonlinemart.com, or message us on our official Facebook page. Our business hours are 10:00 AM - 9:00 PM (Saturday-Thursday) and 3:00 PM - 9:00 PM (Friday).",
      },
      {
        q: "How quickly do you respond to inquiries?",
        a: "We aim to respond to all inquiries within a few hours during business hours. Messages received outside business hours will be addressed the next working day.",
      },
      {
        q: "Where is your store located?",
        a: "Our store is located at 39 & 41 Sonargaon Janapath Road, Sector 13, Uttara, Dhaka (Shop no: 05). You can visit us during business hours.",
      },
    ],
  },
];

export default function FAQContent() {
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
              <HelpCircle className="w-4 h-4" />
              <span className="tracking-wide uppercase">Help Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="text-babybloom-pink">Questions</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about ordering, delivery,
              payments, exchanges, and more.
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

      {/* Category Quick Nav */}
      <section className="py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {faqCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-babybloom-pink/10 hover:text-babybloom-pink text-sm font-medium text-gray-600 whitespace-nowrap transition-colors duration-200 border border-gray-100 hover:border-babybloom-pink/20"
              >
                <cat.icon className="w-4 h-4" />
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-babybloom-pink/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-babybloom-pink" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>

                {/* Accordion */}
                <Accordion
                  type="single"
                  collapsible
                  className="space-y-3"
                >
                  {category.questions.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.id}-${i}`}
                      className="bg-gray-50 rounded-xl border border-gray-100 px-5 data-[state=open]:bg-babybloom-pink/5 data-[state=open]:border-babybloom-pink/20 transition-colors duration-300"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-gray-900 hover:text-babybloom-pink py-5 hover:no-underline [&[data-state=open]]:text-babybloom-pink">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Search className="w-10 h-10 text-babybloom-pink mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is
              here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 bg-babybloom-pink text-white px-6 py-3 rounded-xl font-semibold hover:bg-babybloom-pink/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
              <a
                href="tel:+8801306915635"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-babybloom-pink hover:text-babybloom-pink transition-all duration-300"
              >
                Call +8801306915635
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

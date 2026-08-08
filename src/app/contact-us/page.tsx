"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Send,
  Loader2,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { createContactInfo, IContact } from "@/services/contactService";
import Swal from "sweetalert2";
import useAnalytics from "@/hooks/useAnalytics";
import { brandConfig } from "@/config/brand";

const contactCards = [
  {
    icon: Phone,
    label: "Call Us",
    value: brandConfig.contact.phone.display,
    href: brandConfig.contact.phone.link,
    description: "Available during business hours",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: brandConfig.contact.phone.whatsapp,
    href: `https://wa.me/${brandConfig.contact.phone.whatsapp.replace(/[^0-9]/g, "")}`,
    description: "Chat with us on WhatsApp",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: brandConfig.contact.email.address,
    href: `mailto:${brandConfig.contact.email.address}`,
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: brandConfig.contact.address.full,
    href: `https://www.google.com/maps/search/?api=1&query=${brandConfig.contact.address.coordinates.lat},${brandConfig.contact.address.coordinates.lng}`,
    description: "Open during store hours",
  },
];

const businessHours = [
  { day: "Saturday - Thursday", hours: "10:00 AM - 9:00 PM", active: true },
  { day: "Friday", hours: "3:00 PM - 9:00 PM", active: true },
];

const ContactUs = () => {
  useAnalytics();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else {
      const phoneNumber = formData.phone.replace(/[\s\-+()]/g, "");
      if (phoneNumber.length < 10 || phoneNumber.length > 15) {
        newErrors.phone = "Please enter a valid phone number.";
        isValid = false;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendContactInfo = async (data: IContact) => {
    setIsSubmitting(true);
    try {
      const res = await createContactInfo(data);

      if (res) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for reaching out. We'll get back to you shortly.",
          icon: "success",
          confirmButtonColor: "#CD2A75",
        }).then(() => {
          setFormData({ name: "", email: "", phone: "", message: "" });
          setErrors({ name: "", email: "", phone: "", message: "" });
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again later or contact us directly.",
          icon: "error",
          confirmButtonColor: "#CD2A75",
        });
      }
    } catch {
      Swal.fire({
        title: "Something Went Wrong!",
        text: "We encountered an error. Please try again later.",
        icon: "error",
        confirmButtonColor: "#CD2A75",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      sendContactInfo(formData);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-babybloom-pink-light via-white to-pink-50'>
        <div className='absolute inset-0 opacity-[0.03]'>
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #CD2A75 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative'>
          <div className='max-w-3xl mx-auto text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-babybloom-pink/10 text-babybloom-pink text-sm font-medium rounded-full mb-6'>
              <MessageCircle className='w-4 h-4' />
              <span className='tracking-wide uppercase'>Get in Touch</span>
            </div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Contact <span className='text-babybloom-pink'>Us</span>
            </h1>
            <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
              Have a question, suggestion, or need help with an order?
              We&apos;re here to help. Reach out to us through any of the
              channels below.
            </p>
          </div>
        </div>

        <div className='absolute bottom-0 left-0 right-0'>
          <svg
            viewBox='0 0 1440 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='w-full'
            preserveAspectRatio='none'>
            <path
              d='M0 50V25C240 8 480 0 720 8C960 16 1200 35 1440 25V50H0Z'
              fill='white'
            />
          </svg>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className='py-8 md:py-12 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {contactCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  card.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className='group p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-babybloom-pink/20 hover:bg-babybloom-pink/5 transition-all duration-300'>
                <div className='w-12 h-12 rounded-xl bg-babybloom-pink/10 flex items-center justify-center mb-3 group-hover:bg-babybloom-pink transition-colors duration-300'>
                  <card.icon className='w-6 h-6 text-babybloom-pink group-hover:text-white transition-colors duration-300' />
                </div>
                <h3 className='font-bold text-gray-900 mb-1'>{card.label}</h3>
                <p className='text-sm text-babybloom-pink font-medium break-all mb-1'>
                  {card.value}
                </p>
                <p className='text-xs text-gray-400'>{card.description}</p>
                {card.href.startsWith("http") && (
                  <ExternalLink className='w-3 h-3 text-gray-300 mt-2 group-hover:text-babybloom-pink transition-colors' />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-8 md:py-12 bg-white'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12'>
            {/* Left - Form */}
            <div className='lg:col-span-3'>
              <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8'>
                <div className='mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                    Send Us a Message
                  </h2>
                  <p className='text-gray-500 text-sm'>
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-5'>
                  {/* Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                      Full Name <span className='text-babybloom-pink'>*</span>
                    </label>
                    <Input
                      type='text'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder='Your full name'
                      className='border-gray-200 focus:border-babybloom-pink focus:ring-babybloom-pink/20 h-11'
                    />
                    {errors.name && (
                      <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                        Email Address{" "}
                        <span className='text-babybloom-pink'>*</span>
                      </label>
                      <Input
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder='you@example.com'
                        className='border-gray-200 focus:border-babybloom-pink focus:ring-babybloom-pink/20 h-11'
                      />
                      {errors.email && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                        Phone Number{" "}
                        <span className='text-babybloom-pink'>*</span>
                      </label>
                      <Input
                        type='tel'
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder='01XXXXXXXXX'
                        className='border-gray-200 focus:border-babybloom-pink focus:ring-babybloom-pink/20 h-11'
                      />
                      {errors.phone && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                      Your Message{" "}
                      <span className='text-babybloom-pink'>*</span>
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder='How can we help you?'
                      rows={5}
                      className='border-gray-200 focus:border-babybloom-pink focus:ring-babybloom-pink/20 resize-none'
                    />
                    {errors.message && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-babybloom-pink hover:bg-babybloom-pink/90 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'>
                    {isSubmitting ? (
                      <span className='flex items-center justify-center gap-2'>
                        <Loader2 className='w-4 h-4 animate-spin' />
                        Sending...
                      </span>
                    ) : (
                      <span className='flex items-center justify-center gap-2'>
                        <Send className='w-4 h-4' />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right - Info Sidebar */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Business Hours */}
              <div className='bg-gradient-to-br from-babybloom-pink/5 to-pink-50/50 rounded-2xl p-6 border border-babybloom-pink/10'>
                <div className='flex items-center gap-2 mb-4'>
                  <Clock className='w-5 h-5 text-babybloom-pink' />
                  <h3 className='font-bold text-gray-900'>Business Hours</h3>
                </div>
                <div className='space-y-3'>
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className='flex justify-between items-center'>
                      <span className='text-sm text-gray-600'>{item.day}</span>
                      <span className='text-sm font-semibold text-gray-900'>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='mt-4 pt-4 border-t border-babybloom-pink/10'>
                  <p className='text-xs text-gray-500'>
                    * Closed on public holidays. Hours are in Bangladesh
                    Standard Time (BST).
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className='bg-gray-50 rounded-2xl p-6 border border-gray-100'>
                <h3 className='font-bold text-gray-900 mb-4'>Follow Us</h3>
                <div className='space-y-3'>
                  <a
                    href={brandConfig.social.facebook.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-babybloom-pink/20 hover:bg-babybloom-pink/5 transition-all duration-300 group'>
                    <div className='w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300'>
                      <Facebook className='w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        Facebook
                      </p>
                      <p className='text-xs text-gray-400'>
                        {brandConfig.social.facebook.username}
                      </p>
                    </div>
                    <ExternalLink className='w-3 h-3 text-gray-300 ml-auto group-hover:text-babybloom-pink transition-colors' />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className='rounded-2xl overflow-hidden border border-gray-100 shadow-sm'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.435804447679!2d90.38606279999999!3d23.8741603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c56a9e5f2d79%3A0x77a4612ba106be5!2sUttara%20Square%20Shopping%20Mall!5e0!3m2!1sen!2sbd!4v1786189456735!5m2!1sen!2sbd'
                  width='100%'
                  height='250'
                  className='border-0 w-full'
                  allowFullScreen={false}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Luxury Online Mart Store Location'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;

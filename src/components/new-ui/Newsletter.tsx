"use client";

import React, { useState } from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";
import { config } from "@/lib/config";
import axios from "axios";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "already">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${config.newsletter.subscribe()}`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data?.success) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409 || message?.includes("already subscribed")) {
          setStatus("already");
          setErrorMessage("This email is already subscribed!");
        } else {
          setStatus("error");
          setErrorMessage(message || "Something went wrong. Please try again.");
        }
      } else {
        setStatus("error");
        setErrorMessage("Network error. Please check your connection.");
      }
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FDF5F8]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative max-w-2xl mx-auto text-center'>
          {/* Decorative dots */}
          <div className='flex justify-center gap-1.5 mb-4'>
            {["#FBBFD4", "#F9A8C5", "#F690B5", "#F9A8C5", "#FBBFD4"].map(
              (color, i) => (
                <span
                  key={i}
                  className='inline-block w-1.5 h-1.5 rounded-full'
                  style={{ background: color }}
                />
              ),
            )}
          </div>

          <p className='text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#CD2A75] mb-3'>
            Stay Connected
          </p>

          <h2 className='text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-neutral-900 leading-tight mb-3 sm:mb-4'>
            Join the Luxury Online Mart Family
          </h2>

          <p className='text-sm sm:text-base text-neutral-500 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed'>
            Subscribe for early access to new collections, exclusive offers, and
            parenting tips curated just for you.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email address'
              required
              disabled={isLoading}
              className='flex-1 h-12 sm:h-13 px-5 text-sm bg-white border border-neutral-200 rounded-full text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#CD2A75]/30 focus:border-[#CD2A75] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
            />
            <button
              type='submit'
              disabled={isLoading || status === "success"}
              className={`h-12 sm:h-13 px-7 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap ${
                status === "success"
                  ? "bg-emerald-500 text-white"
                  : status === "error" || status === "already"
                    ? "bg-amber-500 text-white"
                    : "bg-[#CD2A75] hover:bg-[#B02462] text-white"
              } disabled:opacity-70 disabled:cursor-not-allowed`}>
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  Subscribing...
                </>
              ) : status === "success" ? (
                <>
                  <Check className='w-4 h-4' />
                  Subscribed!
                </>
              ) : status === "error" || status === "already" ? (
                <>
                  <AlertCircle className='w-4 h-4' />
                  {status === "already" ? "Already Subscribed" : "Try Again"}
                </>
              ) : (
                <>
                  <Send className='w-4 h-4' />
                  Subscribe
                </>
              )}
            </button>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <p className='text-xs text-emerald-600 mt-4 tracking-wide font-medium'>
              Thank you for subscribing! Check your inbox for a welcome message.
            </p>
          )}
          {(status === "error" || status === "already") && errorMessage && (
            <p className='text-xs text-red-500 mt-4 tracking-wide font-medium'>
              {errorMessage}
            </p>
          )}
          {status === "idle" && (
            <p className='text-[10px] sm:text-xs text-neutral-300 mt-4 tracking-wide'>
              We respect your privacy. Unsubscribe anytime.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

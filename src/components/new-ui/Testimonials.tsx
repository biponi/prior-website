'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Fatima Rahman',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    text: 'The quality of their baby products is exceptional. Soft, breathable fabrics that last through countless washes. My baby is always comfortable and happy!',
    avatar: 'FR',
  },
  {
    id: 2,
    name: 'Ayesha Khan',
    location: 'Chittagong, Bangladesh',
    rating: 5,
    text: 'Found everything I needed for my newborn here. The baby care products are gentle and safe. Customer service was wonderful and helped me pick perfect gifts!',
    avatar: 'AK',
  },
  {
    id: 3,
    name: 'Nadia Islam',
    location: 'Sylhet, Bangladesh',
    rating: 5,
    text: 'The delivery was super fast and the packaging was beautiful. Every item was exactly as described. These are the cutest baby accessories I have found online!',
    avatar: 'NI',
  },
  {
    id: 4,
    name: 'Sabrina Ahmed',
    location: 'Rajshahi, Bangladesh',
    rating: 5,
    text: 'As a first-time mom, I was overwhelmed with choices. Prior made it so easy to find exactly what I needed. Highly recommended for all new parents!',
    avatar: 'SA',
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(next, 6000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  return (
    <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8 sm:mb-10 md:mb-12 space-y-2 sm:space-y-3'>
          <div className='flex items-center justify-center gap-3'>
            <span className='w-8 h-px bg-[#CD2A75]' />
            <p className='text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#CD2A75]'>
              Customer Love
            </p>
            <span className='w-8 h-px bg-[#CD2A75]' />
          </div>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide text-neutral-900 leading-tight'>
            What Parents Are Saying
          </h2>
          <p className='text-sm sm:text-base text-neutral-400 max-w-lg mx-auto'>
            Join thousands of happy parents who trust Prior for their baby&apos;s
            needs
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className='relative max-w-4xl mx-auto'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          {/* Quote Icon */}
          <div className='absolute -top-4 left-0 sm:left-8 z-10'>
            <Quote className='w-10 h-10 sm:w-12 sm:h-12 text-[#CD2A75]/15 fill-[#CD2A75]/10' />
          </div>

          {/* Card */}
          <div className='bg-neutral-50 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 min-h-[280px] sm:min-h-[300px] flex flex-col justify-center'>
            <div className='text-center space-y-4 sm:space-y-5'>
              {/* Stars */}
              <div className='flex justify-center gap-1'>
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400'
                  />
                ))}
              </div>

              {/* Text */}
              <p className='text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto italic'>
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Author */}
              <div className='pt-2 sm:pt-3 space-y-2'>
                <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#CD2A75] text-white flex items-center justify-center text-xs sm:text-sm font-medium mx-auto'>
                  {testimonials[current].avatar}
                </div>
                <div>
                  <p className='text-sm sm:text-base font-medium text-neutral-900 tracking-wide'>
                    {testimonials[current].name}
                  </p>
                  <p className='text-xs sm:text-sm text-neutral-400'>
                    {testimonials[current].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='flex items-center justify-center gap-4 mt-6 sm:mt-8'>
            <button
              onClick={prev}
              className='w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300'
              aria-label='Previous testimonial'>
              <ChevronLeft className='w-4 h-4' />
            </button>

            {/* Dots */}
            <div className='flex gap-2'>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 bg-[#CD2A75]'
                      : 'w-1.5 bg-neutral-200 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className='w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300'
              aria-label='Next testimonial'>
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Mail, Phone, ArrowRight } from "lucide-react";
import { brandConfig } from "@/config/brand";

const BabyBloomFooter: React.FC = () => {
  return (
    <footer aria-labelledby='footer-heading' className='bg-[#1a1a2e]'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>

      {/* Newsletter Section */}
      <div className='bg-[#16162a] border-b border-white/5 hidden'>
        <div className='container mx-auto px-4 py-10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='text-center md:text-left'>
              <h3 className='text-lg font-bold text-white mb-1'>
                Stay in the Loop
              </h3>
              <p className='text-sm text-white/50'>
                Subscribe for exclusive offers, new arrivals & more
              </p>
            </div>
            <form className='flex w-full max-w-md'>
              <input
                id='email-address'
                name='email-address'
                type='email'
                required
                placeholder='Enter your email'
                autoComplete='email'
                className='flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#CD2A75] transition-colors'
              />
              <button
                type='submit'
                className='bg-[#CD2A75] text-white px-6 py-3 rounded-r-lg font-semibold text-sm hover:bg-[#B02462] transition-colors flex items-center gap-2'>
                Subscribe
                <ArrowRight className='w-4 h-4' />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-10'>
          {/* Brand + Contact */}
          <div className='md:col-span-1'>
            <Image
              src={brandConfig.assets.logo}
              alt='Company Logo'
              width={120}
              height={40}
              className='h-9 w-auto mb-4 '
            />
            <p className='text-sm text-white/40 mb-4 leading-relaxed'>
              Premium baby products for your little ones. Quality you can trust.
            </p>
            <div className='space-y-2.5'>
              <a
                href={brandConfig.contact.phone.link}
                className='flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors'>
                <Phone size={14} />
                <span>{brandConfig.contact.phone.display}</span>
              </a>
              <a
                href={`mailto:${brandConfig.contact.email.address}`}
                className='flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors'>
                <Mail size={14} />
                <span>{brandConfig.contact.email.display}</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className='text-sm font-bold text-white uppercase tracking-wider mb-4'>
              Company
            </h4>
            <ul role='list' className='space-y-2.5'>
              {brandConfig.navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm text-white/40 hover:text-white transition-colors duration-200'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className='text-sm font-bold text-white uppercase tracking-wider mb-4'>
              Legal
            </h4>
            <ul role='list' className='space-y-2.5'>
              {brandConfig.navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm text-white/40 hover:text-white transition-colors duration-200'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className='text-sm font-bold text-white uppercase tracking-wider mb-4'>
              Support
            </h4>
            <ul role='list' className='space-y-2.5'>
              {brandConfig.navigation.customer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm text-white/40 hover:text-white transition-colors duration-200'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-white/30 text-center md:text-left'>
            {brandConfig.legal.copyright}
          </p>
          <div className='flex items-center gap-4'>
            {brandConfig.social.facebook.enabled &&
              brandConfig.social.facebook.url && (
                <a
                  href={brandConfig.social.facebook.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#CD2A75] hover:text-white transition-all duration-300'
                  aria-label='Facebook'>
                  <Facebook size={16} />
                </a>
              )}
            {brandConfig.social.instagram.enabled &&
              brandConfig.social.instagram.url && (
                <a
                  href={brandConfig.social.instagram.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#CD2A75] hover:text-white transition-all duration-300'
                  aria-label='Instagram'>
                  <Instagram size={16} />
                </a>
              )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BabyBloomFooter;

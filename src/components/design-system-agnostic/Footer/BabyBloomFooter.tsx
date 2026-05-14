import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { brandConfig } from "@/config/brand";

/**
 * Baby Bloom Footer Component
 *
 * Features:
 * - Pink theme (#CD2A75)
 * - English text
 * - Mobile-first design
 * - Newsletter subscription
 */

const BabyBloomFooter: React.FC = () => {
  return (
    <footer
      aria-labelledby='footer-heading'
      className='bg-white border-t border-ds-border'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>

      {/* Newsletter Section */}
      <div className='bg-ds-muted py-8 px-4 hidden'>
        <div className='container mx-auto max-w-2xl text-center'>
          <h3 className='text-xl font-bold text-ds-primary mb-2'>
            Subscribe to Newsletter
          </h3>
          <p className='text-sm text-ds-foreground mb-4'>
            Get the latest offers and new collection updates
          </p>
          <form className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto'>
            <input
              id='email-address'
              name='email-address'
              type='email'
              required
              placeholder='Enter your email'
              autoComplete='email'
              className='flex-1 px-4 py-2 border border-ds-border rounded focus:outline-none focus:ring-2 focus:ring-ds-primary'
            />
            <button
              type='submit'
              className='bg-ds-primary text-white px-6 py-2 rounded font-medium hover:bg-opacity-90 transition-colors'>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='container mx-auto px-4 py-12 bg-pink-50'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-bold text-ds-primary mb-4'>Contact</h4>
            <div className='space-y-3'>
              <a
                href={brandConfig.contact.phone.link}
                className='flex items-center gap-2 text-ds-foreground hover:text-ds-primary'>
                <Phone size={18} />
                <span>{brandConfig.contact.phone.display}</span>
              </a>
              <a
                href={`mailto:${brandConfig.contact.email.address}`}
                className='flex items-center gap-2 text-ds-foreground hover:text-ds-primary'>
                <Mail size={18} />
                <span>{brandConfig.contact.email.display}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className='flex gap-4 mt-6'>
              {brandConfig.social.facebook.enabled && brandConfig.social.facebook.url && (
                <a
                  href={brandConfig.social.facebook.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-ds-foreground hover:text-ds-primary transition-colors'
                  aria-label='Facebook'>
                  <Facebook size={24} />
                </a>
              )}
              {brandConfig.social.instagram.enabled && brandConfig.social.instagram.url && (
                <a
                  href={brandConfig.social.instagram.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-ds-foreground hover:text-ds-primary transition-colors'
                  aria-label='Instagram'>
                  <Instagram size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className='text-lg font-bold text-ds-primary mb-4'>Company</h4>
            <ul role='list' className='space-y-2'>
              {brandConfig.navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm text-ds-foreground hover:text-ds-primary transition-colors'>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Customer Service */}
          <div>
            <h4 className='text-lg font-bold text-ds-primary mb-4'>
              Information
            </h4>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <ul role='list' className='space-y-2'>
                  {brandConfig.navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='text-sm text-ds-foreground hover:text-ds-primary transition-colors'>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul role='list' className='space-y-2'>
                  {brandConfig.navigation.customer.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className='text-sm text-ds-foreground hover:text-ds-primary transition-colors'>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-ds-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-ds-secondary text-center md:text-left'>
            {brandConfig.legal.copyright}
          </p>
          <div className='flex items-center gap-4'>
            <Image
              src={brandConfig.assets.paymentMethods}
              alt='Payment Methods'
              width={100}
              height={32}
              className='h-8 w-auto'
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BabyBloomFooter;

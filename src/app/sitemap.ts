import { MetadataRoute } from 'next';
import { config } from '@/lib/config';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://priorbd.com';

/**
 * Generate dynamic sitemap for SEO
 * Includes: products, categories, blog posts (when implemented)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  try {
    // Fetch all products
    let products: any[] = [];
    try {
      const productResponse = await fetch(config.product.getProducts(), {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      if (productResponse.ok) {
        const json = await productResponse.json();
        products = json?.products || json?.data || json || [];
        if (!Array.isArray(products)) products = [];
      }
    } catch (error) {
      console.error('Failed to fetch products for sitemap:', error);
    }

    // Fetch all categories
    let categories: any[] = [];
    try {
      const categoryResponse = await fetch(config.product.getCategories(), {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      if (categoryResponse.ok) {
        const json = await categoryResponse.json();
        categories = json?.data || json || [];
        if (!Array.isArray(categories)) categories = [];
      }
    } catch (error) {
      console.error('Failed to fetch categories for sitemap:', error);
    }

    // Build product URLs
    const productUrls = products
      .filter((product: any) => product.slug && product.active !== false)
      .map((product: any) => ({
        url: `${baseUrl}/collections/${product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    // Build category URLs
    const categoryUrls = categories
      .filter((category: any) => category.slug)
      .map((category: any) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }));

    // Static pages
    const staticPages = [
      {
        url: `${baseUrl}/`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/contact-us`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/shipping`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/returns`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: currentDate,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms-conditions`,
        lastModified: currentDate,
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.7,
      },
    ];

    return [
      ...staticPages,
      ...productUrls,
      ...categoryUrls,
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);

    // Return basic sitemap on error
    return [
      {
        url: `${baseUrl}/`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
    ];
  }
}

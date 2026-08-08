import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://priorbd.com';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.luxuryonlinemart.com';

/**
 * Generate dynamic sitemap for SEO
 * Includes: products, categories, blog posts (when implemented)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  try {
    // Fetch all products
    let products = [];
    try {
      const productResponse = await fetch(`${apiUrl}/product/all`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      if (productResponse.ok) {
        products = await productResponse.json();
      }
    } catch (error) {
      console.error('Failed to fetch products for sitemap:', error);
    }

    // Fetch all categories
    let categories = [];
    try {
      const categoryResponse = await fetch(`${apiUrl}/category/all`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      if (categoryResponse.ok) {
        categories = await categoryResponse.json();
      }
    } catch (error) {
      console.error('Failed to fetch categories for sitemap:', error);
    }

    // Fetch all blog posts (when implemented)
    let blogs = [];
    try {
      const blogResponse = await fetch(`${apiUrl}/blog/all`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });
      if (blogResponse.ok) {
        blogs = await blogResponse.json();
      }
    } catch (error) {
      // Blog API might not be ready yet, that's fine
      console.log('Blog API not available for sitemap yet');
    }

    // Build product URLs
    const productUrls = products
      .filter((product: any) => product.slug && product.active)
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

    // Build blog URLs
    const blogUrls = blogs
      .filter((blog: any) => blog.slug && blog.status === 'published')
      .map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.publishedAt ? new Date(blog.publishedAt) : new Date(blog.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
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
      ...blogUrls,
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

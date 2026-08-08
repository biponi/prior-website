import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://priorbd.com';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.luxuryonlinemart.com';

/**
 * Cached blog fetch with 60-second revalidation
 */
const getCachedBlogs = unstable_cache(
  async () => {
    try {
      const response = await fetch(`${apiUrl}/prior/blog/all`, {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        return [];
      }
      const json = await response.json();
      // API returns { success: true, data: { posts: [...], pagination: {...} } }
      return json?.success ? json.data.posts : [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },
  ['blogs'],
  { revalidate: 60 }
);

/**
 * Generate SEO metadata for blog listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Luxury Online Mart | Kids Fashion & Lifestyle Tips',
    description: 'Discover the latest kids fashion trends, parenting tips, and lifestyle guides. Expert advice on children clothing, accessories, and more for modern families in Bangladesh.',
    keywords: ['kids fashion blog', 'parenting tips Bangladesh', 'children lifestyle', 'kids clothing guide'],
    openGraph: {
      title: 'Blog - Luxury Online Mart',
      description: 'Latest kids fashion trends and parenting tips for parents in Bangladesh',
      type: 'website',
      url: `${baseUrl}/blog`,
      siteName: 'Luxury Online Mart',
      locale: 'en_BD',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Luxury Online Mart',
      description: 'Latest kids fashion trends and parenting tips',
    },
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Blog listing page - Server Component with ISR
 * Displays all published blog posts with pagination support
 */
export default async function BlogPage() {
  const blogs = await getCachedBlogs();
  // API already filters for published status, so all returned blogs are published
  const publishedBlogs = blogs;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-neutral-900">Our Blog</h1>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
          Expert tips on kids fashion, parenting advice, and lifestyle guides for modern families in Bangladesh.
        </p>
      </div>

      {/* Loading State */}
      {!blogs || blogs.length === 0 ? (
        <div className="text-center py-20">
          <LoaderCircle className="w-8 h-8 animate-spin mx-auto mb-4 text-neutral-400" />
          <p className="text-neutral-500">Loading blog posts...</p>
        </div>
      ) : publishedBlogs.length === 0 ? (
        <div className="text-center py-20 bg-neutral-50 rounded-2xl">
          <p className="text-neutral-600">No blog posts published yet. Check back soon!</p>
        </div>
      ) : (
        <>
          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog: any) => (
              <Link
                key={blog.slug || blog._id}
                href={`/blog/${blog.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100">
                  {/* Featured Image */}
                  {blog.featuredImage && (
                    <div className="aspect-video overflow-hidden bg-neutral-100">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={400}
                        height={225}
                        className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                      {blog.publishedAt && (
                        <span>
                          {new Date(blog.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      {blog.readingTime && (
                        <>
                          <span>•</span>
                          <span>{blog.readingTime} min read</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors text-neutral-900">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-neutral-600 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-primary/5 rounded-2xl p-12">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900">
              Stay Updated with Latest Trends
            </h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Get expert parenting tips, kids fashion guides, and lifestyle advice delivered to your inbox.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

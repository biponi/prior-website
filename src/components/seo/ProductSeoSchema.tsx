import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl, stripHtml } from "@/lib/seo";
import type { SingleProductType } from "@/data/types";

interface ProductSeoSchemaProps {
  product: SingleProductType;
  categoryName?: string;
  categorySlug?: string;
}

export default function ProductSeoSchema({
  product,
  categoryName,
  categorySlug,
}: ProductSeoSchemaProps) {
  const url = `${SITE_URL}/collections/${product.slug || product.id}`;
  const description = stripHtml(product.description).slice(0, 300);

  const images = [product.thumbnail, ...(product.images || [])]
    .filter(Boolean)
    .map(absoluteUrl);

  const price = product.hasDiscount ? product.updatedPrice : product.unitPrice;

  const breadcrumbItemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    ...(categorySlug || product.categoryId
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: categoryName || product.categoryName || "Category",
            item: categorySlug
              ? `${SITE_URL}/category/${categorySlug}`
              : undefined,
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: categorySlug || product.categoryId ? 3 : 2,
      name: product.name,
      item: url,
    },
  ];

  const schemaProduct: Record<string, any> = {
    "@type": "Product",
    "@id": url,
    name: product.name,
    description,
    image: images,
    url,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Luxury Online Mart",
    },
    offers: {
      "@type": "Offer",
      url,
      price: String(price ?? 0),
      priceCurrency: "BDT",
      availability:
        product.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  if (product.rating && product.rating > 0) {
    const reviewCount = product.ratingDetails?.length || 0;
    if (reviewCount > 0) {
      schemaProduct.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: String(product.rating),
        reviewCount: String(reviewCount),
        bestRating: "5",
        worstRating: "1",
      };
    }
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbItemListElement,
      },
      schemaProduct,
    ],
  };

  return <JsonLd data={graph} />;
}

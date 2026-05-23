import HomePage from "@/app/Home";
import { fetchCategoriesForShowcase } from "@/lib/server/fetchCategories";
import { config } from "@/lib/config";

async function fetchCategoriesAndProducts() {
  try {
    // Fetch new products, you can also fetch categories if needed
    const productResponse = await fetch(config.product.getNewProducts(), {
      method: "GET", // Specify method
      next: { revalidate: 3 },
    });

    // Check if the response is OK (status 200)
    if (!productResponse.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await productResponse.json();
    return { products: products || [] }; // Default to an empty array if no products found
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] }; // Return an empty array on error
  }
}

export default async function Home() {
  console.log("[page] before Promise.all");
  const { products } = await fetchCategoriesAndProducts();
  const categories = await fetchCategoriesForShowcase();

  console.log("[page] categories result:", categories);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <HomePage products={products} categories={categories} />
    </main>
  );
}

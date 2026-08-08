"use client";

import { useEffect, useState, useRef } from "react";
import SidebarFilters from "@/components/SidebarFilter";
import useProductFetch from "@/hooks/useProductFetch";
import { FilterData } from "@/types/filter";
import { ProductType } from "@/data/types";
import { LoaderCircle } from "lucide-react";
import Heading from "@/shared/Heading/Heading";
import { collectionTag } from "@/data/content";
import useAnalytics from "@/hooks/useAnalytics";
import { usePageState } from "@/context/PageStateContext";
import ProductCard from "@/components/new-ui/ProductCard";
import { convertProductTypeToProduct } from "@/utils/functions";
import ProductFiltersSheet from "@/components/new-ui/ProductFilterSheet";

interface CategoryProductsClientProps {
  categoryId: string;
  category: any;
}

const CategoryProductsClient = ({ categoryId, category }: CategoryProductsClientProps) => {
  const { state, setState } = usePageState();

  const {
    products,
    loading,
    totalPages,
    currentPage,
    distictFilterValues,
    setFilterData,
    filterData,
    handleLoadMore,
  } = useProductFetch(1, {
    categoryId,
    color: "",
    size: "",
    price: "",
  });

  useAnalytics();

  useEffect(() => {
    setFilterData({ ...filterData, categoryId });
    //eslint-disable-next-line
  }, [categoryId]);

  const [sheetOpen, setSheetOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && !loading) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [currentPage, totalPages, loading, handleLoadMore]);

  // Restore state on mount
  useEffect(() => {
    // Restore scroll position
    window.scrollTo(0, state.scrollPosition);

    // Restore filter and pagination data
    if (!filterData?.categoryId)
      setFilterData(state.filterData as FilterData);
    if (state.currentPage > 1) {
      handleLoadMore(); // Load next page to restore pagination
    }
    //eslint-disable-next-line
  }, []);

  // Save state before navigation
  const handleProductClick = (productId: string) => {
    setState((prev) => ({
      ...prev,
      scrollPosition: window.scrollY,
      filterData,
      currentPage,
    }));
    window.location.href = `/collections/${productId}`; // Navigate to product page
  };

  return (
    <div className='my-6'>
      <Heading isCenter isMain desc={collectionTag?.description}>
        {category?.name || 'Products'}
      </Heading>
      {loading && (!products || products.length < 1) && (
        <div className='w-full p-12 bg-gray-200 flex justify-center items-center'>
          <span className='flex justify-center items-center gap-2 text-black'>
            Loading... <LoaderCircle className='w-5 h-5 ml-2 text-black' />
          </span>
        </div>
      )}
      {(!!products || !loading) && (
        <div
          className='px-4 md:container relative flex flex-col lg:flex-row'
          id='body'>
          <div className='flex justify-between items-center p-2 md:hidden'>
            <h2 className='text-primary font-semibold'>Products</h2>
            <ProductFiltersSheet
              showCategory={false}
              sizes={distictFilterValues.sizes.filter((i) => i !== "")}
              colors={distictFilterValues.colors.filter((i) => i !== "")}
              categories={distictFilterValues.categories}
              filterData={filterData}
              onFilterChange={(value) => {
                setFilterData(value);
              }}
              onClearFilters={() => {
                setFilterData({
                  categoryId: categoryId,
                  color: "",
                  size: "",
                  price: "",
                });
              }}
            />
          </div>
          {filterData &&
            (filterData?.color || filterData?.size) &&
            (filterData?.color.length > 0 || filterData?.size.length > 0) && (
              <div className='pr-4 lg:basis-1/3 xl:basis-1/4 hidden md:block'>
                <SidebarFilters
                  filterData={filterData}
                  showCategory={false}
                  selectedCategory={categoryId}
                  selectedColor={filterData?.color}
                  selectedSize={filterData?.size}
                  categories={distictFilterValues.categories}
                  colors={distictFilterValues.colors.filter((i) => i !== "")}
                  sizes={distictFilterValues.sizes.filter((i) => i !== "")}
                  handleFilterChange={(value) => {
                    setFilterData(value);
                  }}
                />
              </div>
            )}
          <div className='mb-4 md:mb-10 shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0' />
          <div className='relative flex-1'>
            <div className='grid flex-1 gap-3 md:gap-x-8 md:gap-y-10 grid-cols-2 md:grid-cols-4 '>
              {!!products &&
                products.map((item: ProductType) => (
                  <div
                    key={item?.id}
                    onClick={() => handleProductClick(item.id)}>
                    <ProductCard product={convertProductTypeToProduct(item)} />
                  </div>
                ))}
            </div>
            {loading && (
              <div className='w-full p-12 bg-gray-200 flex justify-center items-center'>
                <span className='flex justify-center items-center gap-2 text-black'>
                  Loading...{" "}
                  <LoaderCircle className='w-5 h-5 ml-2 text-black' />
                </span>
              </div>
            )}
            {/* Observer element for infinite scroll */}
            <div ref={observerRef} className='h-10' />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsClient;

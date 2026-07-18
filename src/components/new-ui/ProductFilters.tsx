"use client";

import React, { useState } from "react";
import {
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Category } from "@/data/types";
import { FilterData } from "@/types/filter";

interface ProductFiltersProps {
  sizes: string[];
  colors: string[];
  categories: Category[];
  filterData: FilterData;
  onFilterChange: (filterData: FilterData) => void;
  onClearFilters?: () => void;
}

/**
 * ProductFilters Component
 * Professional filter panel with search, collapsible sections, and individual scrolling.
 * Fully responsive: compact and touch-friendly on mobile, roomier sidebar on desktop.
 */
export default function ProductFilters({
  sizes,
  colors,
  categories,
  filterData,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    colors: true,
    sizes: true,
  });
  const [searchQueries, setSearchQueries] = useState({
    colors: "",
    sizes: "",
  });

  const toggleSection = (section: "categories" | "colors" | "sizes") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  /**
   * Handle category selection
   */
  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      ...filterData,
      categoryId: filterData.categoryId === categoryId ? "" : categoryId,
    });
  };

  /**
   * Handle color selection/deselection
   */
  const handleColorChange = (color: string) => {
    const currentColors = filterData.color
      ? filterData.color.split(",").filter(Boolean)
      : [];
    const colorIndex = currentColors.indexOf(color);
    let newColors: string[];
    if (colorIndex > -1) {
      newColors = currentColors.filter((c) => c !== color);
    } else {
      newColors = [...currentColors, color];
    }
    onFilterChange({
      ...filterData,
      color: newColors.join(","),
    });
  };

  /**
   * Handle size selection/deselection
   */
  const handleSizeChange = (size: string) => {
    const currentSizes = filterData.size
      ? filterData.size.split(",").filter(Boolean)
      : [];
    const sizeIndex = currentSizes.indexOf(size);
    let newSizes: string[];
    if (sizeIndex > -1) {
      newSizes = currentSizes.filter((s) => s !== size);
    } else {
      newSizes = [...currentSizes, size];
    }
    onFilterChange({
      ...filterData,
      size: newSizes.join(","),
    });
  };

  /**
   * Check if a color is selected
   */
  const isColorSelected = (color: string) => {
    const selectedColors = filterData.color ? filterData.color.split(",") : [];
    return selectedColors.includes(color);
  };

  /**
   * Check if a size is selected
   */
  const isSizeSelected = (size: string) => {
    const selectedSizes = filterData.size ? filterData.size.split(",") : [];
    return selectedSizes.includes(size);
  };

  /**
   * Get active filter count
   */
  const getActiveFilterCount = () => {
    let count = 0;
    if (filterData.categoryId) count++;
    if (filterData.color)
      count += filterData.color.split(",").filter(Boolean).length;
    if (filterData.size)
      count += filterData.size.split(",").filter(Boolean).length;
    return count;
  };
  const activeFilterCount = getActiveFilterCount();

  /**
   * Format color name for display
   */
  const formatColorName = (color: string) => {
    return color
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  /**
   * Filter colors based on search query
   */
  const filteredColors = colors.filter((color) =>
    formatColorName(color)
      .toLowerCase()
      .includes(searchQueries.colors.toLowerCase()),
  );

  /**
   * Filter sizes based on search query
   */
  const filteredSizes = sizes.filter((size) =>
    size.toLowerCase().includes(searchQueries.sizes.toLowerCase()),
  );

  return (
    <div className='w-full bg-white rounded-none border border-[#CD2A75]/20 overflow-hidden flex flex-col max-h-[100dvh] md:max-h-none'>
      {/* Header — sticky so it stays visible while the list scrolls, especially useful in a mobile sheet */}
      <div className='sticky top-0 z-20 flex items-center justify-between gap-3 p-4 sm:p-6 border-b border-[#CD2A75]/20 bg-white/95 backdrop-blur-sm'>
        <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
          <SlidersHorizontal className='w-4 h-4 sm:w-5 sm:h-5 text-[#191C1F] shrink-0' />
          <h2 className='text-base sm:text-lg font-serif tracking-wide text-[#191C1F] truncate'>
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <Badge
              variant='default'
              className='bg-[#CD2A75] text-white rounded-none shrink-0'>
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && onClearFilters && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onClearFilters}
            className='text-xs sm:text-sm font-serif tracking-wide text-[#A3A3A3] hover:text-[#191C1F] hover:bg-[#FDF5F8] transition-colors duration-300 shrink-0 px-2 sm:px-3'>
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Container with overall scroll — height adapts between a mobile sheet and a desktop sidebar */}
      <ScrollArea className='flex-1 h-[calc(100dvh-220px)] md:h-[calc(100vh-280px)]'>
        <div className='p-4 sm:p-6 space-y-5 sm:space-y-6'>
          {/* Categories Filter */}
          {categories.length > 0 && (
            <Collapsible
              open={expandedSections.categories}
              onOpenChange={() => toggleSection("categories")}>
              <CollapsibleTrigger className='flex items-center justify-between w-full py-2.5 sm:py-3 text-sm font-serif tracking-wide text-[#191C1F] hover:text-[#CD2A75] transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#CD2A75]'>
                <span className='flex items-center gap-2'>
                  Categories
                  {filterData.categoryId && (
                    <Badge
                      variant='secondary'
                      className='text-xs rounded-none border border-[#CD2A75]/20 font-serif'>
                      1
                    </Badge>
                  )}
                </span>
                {expandedSections.categories ? (
                  <ChevronUp className='w-4 h-4 text-[#A3A3A3]' />
                ) : (
                  <ChevronDown className='w-4 h-4 text-[#A3A3A3]' />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-3'>
                <ScrollArea className='h-[160px] sm:h-[200px] pr-2'>
                  <div className='space-y-2'>
                    <button
                      onClick={() => handleCategoryChange("")}
                      className={cn(
                        "w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-none text-sm font-serif transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CD2A75]",
                        !filterData.categoryId
                          ? "bg-[#CD2A75] text-white font-medium shadow-sm shadow-[#CD2A75]/30"
                          : "bg-white text-[#191C1F] border border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                      )}>
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={cn(
                          "w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-none text-sm font-serif transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CD2A75]",
                          filterData.categoryId === category.id
                            ? "bg-[#CD2A75] text-white font-medium shadow-sm shadow-[#CD2A75]/30"
                            : "bg-white text-[#191C1F] border border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                        )}>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          )}

          <Separator />

          {/* Colors Filter */}
          {colors.length > 0 && (
            <Collapsible
              open={expandedSections.colors}
              onOpenChange={() => toggleSection("colors")}>
              <CollapsibleTrigger className='flex items-center justify-between w-full py-2.5 sm:py-3 text-sm font-serif tracking-wide text-[#191C1F] hover:text-[#CD2A75] transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#CD2A75]'>
                <span className='flex items-center gap-2'>
                  Colors
                  {filterData.color &&
                    filterData.color.split(",").filter(Boolean).length > 0 && (
                      <Badge
                        variant='secondary'
                        className='text-xs rounded-none border border-[#CD2A75]/20 font-serif'>
                        {filterData.color.split(",").filter(Boolean).length}
                      </Badge>
                    )}
                </span>
                {expandedSections.colors ? (
                  <ChevronUp className='w-4 h-4 text-[#A3A3A3]' />
                ) : (
                  <ChevronDown className='w-4 h-4 text-[#A3A3A3]' />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-3'>
                {/* Color Search */}
                <div className='relative mb-3 sm:mb-4'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]' />
                  <Input
                    type='text'
                    placeholder='Search colors...'
                    value={searchQueries.colors}
                    onChange={(e) =>
                      setSearchQueries((prev) => ({
                        ...prev,
                        colors: e.target.value,
                      }))
                    }
                    className='pl-10 h-11 sm:h-12 text-sm font-serif border-[#CD2A75]/20 rounded-none focus:border-[#CD2A75] focus:ring-1 focus:ring-[#CD2A75]'
                  />
                  {searchQueries.colors && (
                    <button
                      onClick={() =>
                        setSearchQueries((prev) => ({ ...prev, colors: "" }))
                      }
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#191C1F] transition-colors duration-200'
                      aria-label='Clear color search'>
                      <X className='w-4 h-4' />
                    </button>
                  )}
                </div>
                {/* Scrollable Color Grid */}
                <ScrollArea className='h-[200px] sm:h-[250px] pr-2'>
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2'>
                    {filteredColors.length > 0 ? (
                      filteredColors.map((color) => {
                        const selected = isColorSelected(color);
                        return (
                          <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            className={cn(
                              "px-3 sm:px-4 py-2.5 sm:py-3 rounded-none text-xs font-serif tracking-wide transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CD2A75]",
                              selected
                                ? "bg-[#CD2A75] text-white border-[#CD2A75] shadow-sm shadow-[#CD2A75]/30"
                                : "bg-white text-[#191C1F] border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                            )}>
                            {formatColorName(color)}
                          </button>
                        );
                      })
                    ) : (
                      <div className='col-span-2 sm:col-span-3 md:col-span-2 text-center py-4 text-sm font-serif text-[#A3A3A3]'>
                        No colors found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          )}

          <Separator />

          {/* Sizes Filter */}
          {sizes.length > 0 && (
            <Collapsible
              open={expandedSections.sizes}
              onOpenChange={() => toggleSection("sizes")}>
              <CollapsibleTrigger className='flex items-center justify-between w-full py-2.5 sm:py-3 text-sm font-serif tracking-wide text-[#191C1F] hover:text-[#CD2A75] transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#CD2A75]'>
                <span className='flex items-center gap-2'>
                  Sizes
                  {filterData.size &&
                    filterData.size.split(",").filter(Boolean).length > 0 && (
                      <Badge
                        variant='secondary'
                        className='text-xs rounded-none border border-[#CD2A75]/20 font-serif'>
                        {filterData.size.split(",").filter(Boolean).length}
                      </Badge>
                    )}
                </span>
                {expandedSections.sizes ? (
                  <ChevronUp className='w-4 h-4 text-[#A3A3A3]' />
                ) : (
                  <ChevronDown className='w-4 h-4 text-[#A3A3A3]' />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className='mt-3'>
                {/* Size Search */}
                <div className='relative mb-3 sm:mb-4'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]' />
                  <Input
                    type='text'
                    placeholder='Search sizes...'
                    value={searchQueries.sizes}
                    onChange={(e) =>
                      setSearchQueries((prev) => ({
                        ...prev,
                        sizes: e.target.value,
                      }))
                    }
                    className='pl-10 h-11 sm:h-12 text-sm font-serif border-[#CD2A75]/20 rounded-none focus:border-[#CD2A75] focus:ring-1 focus:ring-[#CD2A75]'
                  />
                  {searchQueries.sizes && (
                    <button
                      onClick={() =>
                        setSearchQueries((prev) => ({ ...prev, sizes: "" }))
                      }
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#191C1F] transition-colors duration-200'
                      aria-label='Clear size search'>
                      <X className='w-4 h-4' />
                    </button>
                  )}
                </div>
                {/* Scrollable Size Grid */}
                <ScrollArea className='h-[200px] sm:h-[250px] pr-2'>
                  <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2'>
                    {filteredSizes.length > 0 ? (
                      filteredSizes.map((size) => {
                        const selected = isSizeSelected(size);
                        return (
                          <button
                            key={size}
                            onClick={() => handleSizeChange(size)}
                            className={cn(
                              "px-3 sm:px-4 py-2.5 sm:py-3 rounded-none text-sm font-serif tracking-wide transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CD2A75]",
                              selected
                                ? "bg-[#CD2A75] text-white border-[#CD2A75] shadow-sm shadow-[#CD2A75]/30"
                                : "bg-white text-[#191C1F] border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                            )}>
                            {formatColorName(size)}
                          </button>
                        );
                      })
                    ) : (
                      <div className='col-span-3 sm:col-span-4 md:col-span-3 text-center py-4 text-sm font-serif text-[#A3A3A3]'>
                        No sizes found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </ScrollArea>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className='p-4 sm:p-6 border-t border-[#CD2A75]/20 bg-[#FDF5F8]'>
          <p className='text-xs font-serif tracking-[0.2em] uppercase text-[#191C1F] mb-3'>
            Active Filters
          </p>
          <div className='flex flex-wrap gap-2'>
            {filterData.categoryId && (
              <Badge
                variant='secondary'
                className='flex items-center gap-1 cursor-pointer hover:bg-[#CD2A75]/30 transition-colors duration-300 rounded-none border border-[#CD2A75]/20 font-serif text-xs tracking-wide'
                onClick={() => handleCategoryChange("")}>
                {categories.find((c) => c.id === filterData.categoryId)?.name}
                <X className='w-3 h-3' />
              </Badge>
            )}
            {filterData.color &&
              filterData.color
                .split(",")
                .filter(Boolean)
                .map((color) => (
                  <Badge
                    key={color}
                    variant='secondary'
                    className='flex items-center gap-1 cursor-pointer hover:bg-[#CD2A75]/30 transition-colors duration-300 rounded-none border border-[#CD2A75]/20 font-serif text-xs tracking-wide'
                    onClick={() => handleColorChange(color)}>
                    {formatColorName(color)}
                    <X className='w-3 h-3' />
                  </Badge>
                ))}
            {filterData.size &&
              filterData.size
                .split(",")
                .filter(Boolean)
                .map((size) => (
                  <Badge
                    key={size}
                    variant='secondary'
                    className='flex items-center gap-1 cursor-pointer hover:bg-[#CD2A75]/30 transition-colors duration-300 rounded-none border border-[#CD2A75]/20 font-serif text-xs tracking-wide'
                    onClick={() => handleSizeChange(size)}>
                    {size}
                    <X className='w-3 h-3' />
                  </Badge>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

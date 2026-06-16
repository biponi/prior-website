"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  Search,
  Grid3x3,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Category } from "@/data/types";
import { FilterData } from "@/types/filter";

interface ProductFiltersSheetProps {
  sizes: string[];
  colors: string[];
  categories: Category[];
  filterData: FilterData;
  onFilterChange: (filterData: FilterData) => void;
  onClearFilters?: () => void;
  trigger?: React.ReactNode;
  showCategory?: boolean;
}

interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[];
}

/**
 * ProductFiltersSheet Component
 * Mobile-optimized filter panel in a sheet with hierarchical categories
 */
export default function ProductFiltersSheet({
  sizes,
  colors,
  categories,
  filterData,
  onFilterChange,
  onClearFilters,
  trigger,
  showCategory = true,
}: ProductFiltersSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    colors: true,
    sizes: true,
  });

  const [searchQueries, setSearchQueries] = useState({
    colors: "",
    sizes: "",
  });

  // Build category tree from flat list using ancestors
  const categoryTree = useMemo(() => {
    const buildTree = (flatCategories: Category[]): CategoryTreeNode[] => {
      const categoryMap = new Map<string, CategoryTreeNode>();
      const rootCategories: CategoryTreeNode[] = [];

      // Create map of all categories
      flatCategories.forEach((category) => {
        categoryMap.set(category.id, { ...category, children: [] });
      });

      // Build tree structure using parentId or ancestors
      flatCategories.forEach((category) => {
        const categoryNode = categoryMap.get(category.id)!;

        // Determine parent from parentId or ancestors
        let parentId: string | null = null;
        if (category.ancestors && category.ancestors.length > 0) {
          // Get the last ancestor as the direct parent
          parentId = category.ancestors[category.ancestors.length - 1];
        }

        if (parentId && categoryMap.has(parentId)) {
          const parent = categoryMap.get(parentId)!;
          if (!parent.children) parent.children = [];
          parent.children.push(categoryNode);
        } else if (
          !parentId ||
          (category.level !== undefined && category.level === 0)
        ) {
          rootCategories.push(categoryNode);
        }
      });

      return rootCategories;
    };

    return buildTree(categories);
  }, [categories]);

  const toggleCategoryExpanded = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const toggleSection = (section: "categories" | "colors" | "sizes") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Category Tree Component
  const CategoryTree: React.FC<{
    categories: CategoryTreeNode[];
    level?: number;
  }> = ({ categories, level = 0 }) => {
    return (
      <div className='space-y-1'>
        {categories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          const isExpanded = expandedCategories.has(category.id);
          const isSelected = filterData.categoryId === category.id;

          return (
            <div key={category.id} className='space-y-1'>
              {hasChildren ? (
                <Collapsible
                  open={isExpanded}
                  onOpenChange={() => toggleCategoryExpanded(category.id)}>
                  <div className='flex items-stretch gap-1'>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={cn(
                        "flex-1 text-left px-4 py-2.5 text-sm font-serif transition-all duration-300 rounded-none",
                        isSelected
                          ? "bg-[#CD2A75] text-white font-medium"
                          : "bg-white text-[#191C1F] border border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                      )}
                      style={{ paddingLeft: `${level * 16 + 16}px` }}>
                      <span className='truncate'>{category.name}</span>
                    </button>
                    <CollapsibleTrigger asChild>
                      <button className='px-3 border border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8] transition-all duration-300 rounded-none'>
                        {isExpanded ? (
                          <ChevronDown className='h-4 w-4 text-[#CD2A75]' />
                        ) : (
                          <ChevronRight className='h-4 w-4 text-[#CD2A75]' />
                        )}
                      </button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className='space-y-1 mt-1'>
                    <CategoryTree
                      //@ts-ignore
                      categories={category?.children}
                      level={level + 1}
                    />
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <button
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm font-serif transition-all duration-300 rounded-none",
                    isSelected
                      ? "bg-[#CD2A75] text-white font-medium"
                      : "bg-white text-[#191C1F] border border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                  )}
                  style={{ paddingLeft: `${level * 16 + 16}px` }}>
                  <span className='truncate'>{category.name}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
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
    if (showCategory && filterData.categoryId) count++;
    if (filterData.color)
      count += filterData.color.split(",").filter(Boolean).length;
    if (filterData.size)
      count += filterData.size.split(",").filter(Boolean).length;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  /**
   * Format color/size name for display
   */
  const formatName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  /**
   * Filter colors based on search query
   */
  const filteredColors = colors.filter((color) =>
    formatName(color)
      .toLowerCase()
      .includes(searchQueries.colors.toLowerCase()),
  );

  /**
   * Filter sizes based on search query
   */
  const filteredSizes = sizes.filter((size) =>
    size.toLowerCase().includes(searchQueries.sizes.toLowerCase()),
  );

  /**
   * Get selected category name
   */
  const selectedCategoryName = useMemo(() => {
    const findCategory = (cats: CategoryTreeNode[]): string => {
      for (const cat of cats) {
        if (cat.id === filterData.categoryId) return cat.name;
        if (cat.children) {
          const found = findCategory(cat.children);
          if (found) return found;
        }
      }
      return "";
    };
    return findCategory(categoryTree);
  }, [categoryTree, filterData.categoryId]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button className='lg:hidden relative z-50 inline-flex items-center justify-center gap-1.5 h-9 md:h-10 px-4 md:px-5 text-xs md:text-sm font-serif tracking-[0.15em] uppercase text-[#191C1F] hover:text-white bg-white hover:bg-[#CD2A75] rounded-none transition-all duration-300 group whitespace-nowrap flex-shrink-0 overflow-hidden'>
            {/* Continuous Animated Border */}
            <span className='absolute inset-0 z-0'>
              {/* Top Border */}
              <span className='absolute top-0 h-[2px] bg-gradient-to-r from-[#A3A3A3] via-[#A3A3A3] to-[#CD2A75] animate-border-draw-top' />

              {/* Right Border */}
              <span className='absolute right-0 w-[2px] bg-gradient-to-b from-[#A3A3A3] via-[#A3A3A3] to-[#CD2A75] animate-border-draw-right' />

              {/* Bottom Border */}
              <span className='absolute bottom-0 h-[2px] bg-gradient-to-l from-[#A3A3A3] via-[#A3A3A3] to-[#CD2A75] animate-border-draw-bottom' />

              {/* Left Border */}
              <span className='absolute left-0 w-[2px] bg-gradient-to-t from-[#A3A3A3] via-[#A3A3A3] to-[#CD2A75] animate-border-draw-left' />
            </span>

            {/* Static Border (fallback) */}
            <span className='absolute inset-0 border border-[#CD2A75] group-hover:border-transparent transition-colors duration-300 z-0' />

            {/* Hover Overlay - appears on hover */}
            <span className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]'>
              <span className='absolute inset-0 border-2 border-[#CD2A75]' />
            </span>

            {/* Content */}
            <div className='flex items-center gap-3 justify-center'>
              <SlidersHorizontal className='w-5 h-5 text-[#191C1F]' />
              <h2 className='text-sm font-serif tracking-wide text-[#191C1F]'>
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <Badge
                  variant='default'
                  className='ml-2 bg-[#CD2A75] text-white rounded-none'>
                  {activeFilterCount}
                </Badge>
              )}
            </div>
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        side='right'
        className='w-full sm:max-w-md p-0 flex flex-col'>
        {/* Header */}
        <SheetHeader className='px-6 py-4 border-b border-[#CD2A75]/20'>
          <div className='flex items-center justify-between'>
            <SheetTitle className='text-lg font-serif tracking-wide'>
              Filter Products
              {activeFilterCount > 0 && (
                <Badge
                  variant='default'
                  className='ml-3 bg-[#CD2A75] text-white rounded-none'>
                  {activeFilterCount}
                </Badge>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className='px-6 py-3 bg-[#FDF5F8] border-b border-[#CD2A75]/20'>
            <div className='w-full flex justify-between items-center'>
              <p className='text-xs font-serif tracking-wider uppercase text-[#A3A3A3] mb-2'>
                Active Filters:
              </p>
              {activeFilterCount > 0 && onClearFilters && (
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    onClearFilters();
                    setExpandedCategories(new Set());
                    setSearchQueries({ colors: "", sizes: "" });
                  }}
                  className='text-sm font-serif text-[#A3A3A3] hover:text-[#191C1F]'>
                  Clear All
                </Button>
              )}
            </div>
            <div className='flex flex-wrap gap-2'>
              {showCategory && filterData.categoryId && (
                <Badge
                  variant='secondary'
                  className='flex items-center gap-1 cursor-pointer hover:bg-[#CD2A75]/30 transition-colors duration-200 rounded-none border border-[#CD2A75]/20 font-serif text-xs'
                  onClick={() => handleCategoryChange("")}>
                  {selectedCategoryName}
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
                      className='flex items-center gap-1 cursor-pointer hover:bg-[#CD2A75]/30 transition-colors duration-200 rounded-none border border-[#CD2A75]/20 font-serif text-xs'
                      onClick={() => handleColorChange(color)}>
                      {formatName(color)}
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
                      className='flex items-center gap-1 cursor-pointer hover:bg-[#CD2A75]/30 transition-colors duration-200 rounded-none border border-[#CD2A75]/20 font-serif text-xs'
                      onClick={() => handleSizeChange(size)}>
                      {size}
                      <X className='w-3 h-3' />
                    </Badge>
                  ))}
            </div>
          </div>
        )}

        {/* Filters Content */}
        <ScrollArea className='flex-1 px-6 py-4'>
          <div className='space-y-6'>
            {/* Categories Filter */}
            {showCategory && categoryTree.length > 0 && (
              <div>
                <Collapsible
                  open={expandedSections.categories}
                  onOpenChange={() => toggleSection("categories")}>
                  <CollapsibleTrigger className='flex items-center justify-between w-full py-2 text-sm font-serif tracking-wide text-[#191C1F] hover:text-[#CD2A75] transition-colors duration-300'>
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
                      <ChevronDown className='w-4 h-4 text-[#CD2A75]' />
                    ) : (
                      <ChevronRight className='w-4 h-4 text-[#CD2A75]' />
                    )}
                  </CollapsibleTrigger>

                  <CollapsibleContent className='mt-3'>
                    <div className='space-y-1 max-h-[400px] overflow-y-auto pr-2'>
                      {/* All Categories Button */}
                      <button
                        onClick={() => handleCategoryChange("")}
                        className={cn(
                          "w-full text-left px-4 py-2.5 rounded-none text-sm font-serif transition-all duration-300",
                          !filterData.categoryId
                            ? "bg-[#CD2A75] text-white font-medium"
                            : "bg-white text-[#191C1F] border border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                        )}>
                        <Grid3x3 className='w-3 h-3 inline mr-2' />
                        All Categories
                      </button>

                      {/* Hierarchical Category Tree */}
                      <CategoryTree categories={categoryTree} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Separator className='my-6' />
              </div>
            )}

            {/* Colors Filter */}
            {colors.length > 0 && (
              <div>
                <Collapsible
                  open={expandedSections.colors}
                  onOpenChange={() => toggleSection("colors")}>
                  <CollapsibleTrigger className='flex items-center justify-between w-full py-2 text-sm font-serif tracking-wide text-[#191C1F] hover:text-[#CD2A75] transition-colors duration-300'>
                    <span className='flex items-center gap-2'>
                      Colors
                      {filterData.color &&
                        filterData.color.split(",").filter(Boolean).length >
                          0 && (
                          <Badge
                            variant='secondary'
                            className='text-xs rounded-none border border-[#CD2A75]/20 font-serif'>
                            {filterData.color.split(",").filter(Boolean).length}
                          </Badge>
                        )}
                    </span>
                    {expandedSections.colors ? (
                      <ChevronDown className='w-4 h-4 text-[#CD2A75]' />
                    ) : (
                      <ChevronRight className='w-4 h-4 text-[#CD2A75]' />
                    )}
                  </CollapsibleTrigger>

                  <CollapsibleContent className='mt-3'>
                    {/* Color Search */}
                    <div className='relative mb-4'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A3A3A3]' />
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
                        className='pl-10 h-10 text-sm font-serif border-[#CD2A75] rounded-none focus:border-[#CD2A75] focus:ring-1 focus:ring-[#CD2A75]'
                      />
                      {searchQueries.colors && (
                        <button
                          onClick={() =>
                            setSearchQueries((prev) => ({
                              ...prev,
                              colors: "",
                            }))
                          }
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A3A3A3] hover:text-[#191C1F]'>
                          <X className='w-4 h-4' />
                        </button>
                      )}
                    </div>

                    {/* Color Grid */}
                    <div className='grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2'>
                      {filteredColors.length > 0 ? (
                        filteredColors.map((color) => {
                          const selected = isColorSelected(color);
                          return (
                            <button
                              key={color}
                              onClick={() => handleColorChange(color)}
                              className={cn(
                                "px-3 py-2.5 rounded-none text-xs font-serif tracking-wide transition-all duration-300 border",
                                selected
                                  ? "bg-[#CD2A75] text-white border-[#CD2A75]"
                                  : "bg-white text-[#191C1F] border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                              )}>
                              {formatName(color)}
                            </button>
                          );
                        })
                      ) : (
                        <div className='col-span-2 text-center py-4 text-sm font-serif text-[#A3A3A3]'>
                          No colors found
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Separator className='my-6' />
              </div>
            )}

            {/* Sizes Filter */}
            {sizes.length > 0 && (
              <div>
                <Collapsible
                  open={expandedSections.sizes}
                  onOpenChange={() => toggleSection("sizes")}>
                  <CollapsibleTrigger className='flex items-center justify-between w-full py-2 text-sm font-serif tracking-wide text-[#191C1F] hover:text-[#CD2A75] transition-colors duration-300'>
                    <span className='flex items-center gap-2'>
                      Sizes
                      {filterData.size &&
                        filterData.size.split(",").filter(Boolean).length >
                          0 && (
                          <Badge
                            variant='secondary'
                            className='text-xs rounded-none border border-[#CD2A75]/20 font-serif'>
                            {filterData.size.split(",").filter(Boolean).length}
                          </Badge>
                        )}
                    </span>
                    {expandedSections.sizes ? (
                      <ChevronDown className='w-4 h-4 text-[#CD2A75]' />
                    ) : (
                      <ChevronRight className='w-4 h-4 text-[#CD2A75]' />
                    )}
                  </CollapsibleTrigger>

                  <CollapsibleContent className='mt-3'>
                    {/* Size Search */}
                    <div className='relative mb-4'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A3A3A3]' />
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
                        className='pl-10 h-10 text-sm font-serif border-[#CD2A75] rounded-none focus:border-[#CD2A75] focus:ring-1 focus:ring-[#CD2A75]'
                      />
                      {searchQueries.sizes && (
                        <button
                          onClick={() =>
                            setSearchQueries((prev) => ({ ...prev, sizes: "" }))
                          }
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A3A3A3] hover:text-[#191C1F]'>
                          <X className='w-4 h-4' />
                        </button>
                      )}
                    </div>

                    {/* Size Grid */}
                    <div className='grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2'>
                      {filteredSizes.length > 0 ? (
                        filteredSizes.map((size) => {
                          const selected = isSizeSelected(size);
                          return (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(size)}
                              className={cn(
                                "px-3 py-2.5 rounded-none text-sm font-serif tracking-wide transition-all duration-300 border",
                                selected
                                  ? "bg-[#CD2A75] text-white border-[#CD2A75]"
                                  : "bg-white text-[#191C1F] border-[#CD2A75]/20 hover:border-[#CD2A75] hover:bg-[#FDF5F8]",
                              )}>
                              {formatName(size)}
                            </button>
                          );
                        })
                      ) : (
                        <div className='col-span-3 text-center py-4 text-sm font-serif text-[#A3A3A3]'>
                          No sizes found
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer with Apply Button */}
        <div className='p-6 border-t border-[#CD2A75]/20 bg-white'>
          <Button
            onClick={() => setIsOpen(false)}
            className='w-full h-12 bg-[#CD2A75] text-white rounded-none text-base font-semibold font-serif tracking-wide hover:bg-[#B02462] transition-colors'>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

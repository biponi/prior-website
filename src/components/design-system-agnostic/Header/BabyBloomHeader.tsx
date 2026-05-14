"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  User,
  Menu,
  Search,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import { brandConfig } from "@/config/brand";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import SearchBox from "@/components/new-ui/SearchBox";
import MobileSearchBox from "@/components/new-ui/MobileSearchBox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCategory from "@/hooks/useCategory";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  level: number;
  totalProducts: number;
  totalChildren: number;
  img?: string;
  children?: Category[];
}

/**
 * Baby Bloom Header Component
 *
 * Features:
 * - Single navbar with inline search
 * - Pink theme (#CD2A75)
 * - English text
 * - Mobile-first design (90%+ mobile traffic)
 */
export default function BabyBloomHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const { cart } = useCart();
  const { authState, logout } = useAuth();
  const { user, isAuthenticated } = authState;
  const pathname = usePathname();
  const { fetchCategories } = useCategory();

  // Fetch categories on mount
  React.useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (data) {
        const categoryTree = buildCategoryTree(data);
        setCategories(categoryTree);
      }
    };
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build category tree from flat list
  const buildCategoryTree = (flatCategories: Category[]): Category[] => {
    const categoryMap = new Map<string, Category>();
    const rootCategories: Category[] = [];

    // First pass: create map
    flatCategories.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Second pass: build tree
    flatCategories.forEach((category) => {
      const node = categoryMap.get(category.id)!;
      if (category.parentId && categoryMap.has(category.parentId)) {
        const parent = categoryMap.get(category.parentId)!;
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      } else {
        rootCategories.push(node);
      }
    });

    return rootCategories;
  };

  const toggleCategory = (categoryId: string) => {
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

  const cartItemsCount =
    cart?.reduce((total: number, item: any) => {
      return total + (item.quantity || 0);
    }, 0) || 0;

  // Render mobile category menu
  const renderMobileCategories = (categories: Category[], level = 0) => {
    return categories.map((category) => (
      <div
        key={category.id}
        className={cn("border-b border-ds-border", level > 0 && "pl-4")}>
        <Link
          href={`/category/${category.slug}`}
          onClick={() => {
            if (category.children && category.children.length > 0) {
              toggleCategory(category.id);
            } else {
              setIsMobileMenuOpen(false);
            }
          }}
          className='flex items-center justify-between py-3 px-4 text-ds-foreground hover:bg-ds-muted'>
          <span className='font-medium'>{category.name}</span>
          {category.children && category.children.length > 0 && (
            <span className='text-xs text-ds-secondary'>
              {expandedCategories.has(category.id) ? "−" : "+"}
            </span>
          )}
        </Link>
        {category.children &&
          category.children.length > 0 &&
          expandedCategories.has(category.id) && (
            <div className='bg-ds-muted'>
              {renderMobileCategories(category.children, level + 1)}
            </div>
          )}
      </div>
    ));
  };

  return (
    <header className='sticky top-0 z-50 w-full bg-white border-b border-ds-border'>
      {/* Top Bar - Contact Info */}
      <div className='bg-[#CD2A75] text-white text-xs py-2 px-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <a
              href={brandConfig.contact.phone.link}
              className='flex items-center gap-1 hover:opacity-80'>
              <Phone size={12} />
              <span className='hidden sm:inline'>
                {brandConfig.contact.phone.display}
              </span>
            </a>
            <a
              href={`mailto:${brandConfig.contact.email.address}`}
              className='hidden sm:flex items-center gap-1 hover:opacity-80'>
              <Mail size={12} />
              <span>{brandConfig.contact.email.display}</span>
            </a>
          </div>
          <div className='flex items-center gap-3'>
            <Link href='/account' className='hover:opacity-80'>
              Account
            </Link>
            <Link href='/wishlist' className='hover:opacity-80'>
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Single Row with Logo, Search, Actions */}
      <div className='bg-white'>
        <div className='container mx-auto px-4 py-3'>
          <div className='flex items-center gap-4'>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className='lg:hidden p-2 hover:bg-ds-muted rounded flex-shrink-0'
              aria-label='Open menu'>
              <Menu className='h-6 w-6 text-ds-primary' />
            </button>

            {/* Logo */}
            <Link href='/' className='flex-shrink-0'>
              <Image
                src={brandConfig.assets.logo}
                alt={brandConfig.assets.logoAlt}
                width={120}
                height={40}
                className='h-10 w-auto'
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center gap-6 flex-shrink-0'>
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className='text-sm font-medium text-ds-foreground hover:text-ds-primary transition-colors whitespace-nowrap'>
                  {category.name}
                </Link>
              ))}
              <Link
                href='/sale'
                className='text-sm font-medium text-red-600 hover:text-red-700 transition-colors whitespace-nowrap'>
                Sale
              </Link>
            </nav>

            {/* Search Bar - Inline */}
            <div className='flex-1 max-w-xl mx-auto hidden md:block'>
              <SearchBox />
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2 flex-shrink-0'>
              {/* Search Button (Mobile) */}
              <button className='md:hidden p-2 hover:bg-[#CD2A75] rounded'>
                <Search className='h-5 w-5 text-ds-primary hover:text-white' />
              </button>

              {/* Wishlist */}
              <Link
                href='/wishlist'
                className='hidden sm:flex p-2 hover:bg-[#CD2A75] rounded'>
                <Heart className='h-5 w-5 text-ds-primary hover:text-white' />
              </Link>

              {/* User Account */}
              <Link href='/account' className='p-2 hover:bg-[#CD2A75] rounded'>
                <User className='h-5 w-5 text-ds-primary hover:text-white' />
              </Link>

              {/* Cart */}
              <Link
                href='/cart'
                className='relative p-2 hover:bg-[#CD2A75] rounded'>
                <ShoppingCart className='h-5 w-5 text-ds-primary hover:text-white' />
                {cartItemsCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-ds-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold'>
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className='md:hidden mt-3'>
            <MobileSearchBox />
          </div>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side='left' className='w-80 p-0'>
          <SheetHeader className='p-4 border-b border-ds-border'>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className='h-[calc(100vh-80px)]'>
            <nav className='py-2'>
              {renderMobileCategories(categories)}
              <div className='border-t border-ds-border'>
                <Link
                  href='/sale'
                  className='flex items-center justify-between py-3 px-4 text-red-600 font-medium hover:bg-ds-muted'
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Sale
                </Link>
              </div>
              {isAuthenticated ? (
                <>
                  <div className='border-t border-ds-border'>
                    <Link
                      href='/account/orders'
                      className='flex items-center justify-between py-3 px-4 text-ds-foreground hover:bg-ds-muted'
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Orders
                    </Link>
                  </div>
                  <div className='border-t border-ds-border'>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className='w-full flex items-center justify-between py-3 px-4 text-ds-foreground hover:bg-ds-muted text-left'>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className='border-t border-ds-border'>
                  <Link
                    href='/auth/login'
                    className='flex items-center justify-between py-3 px-4 text-ds-primary font-medium hover:bg-ds-muted'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Login / Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  );
}

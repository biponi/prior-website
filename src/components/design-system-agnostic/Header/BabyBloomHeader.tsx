"use client";

import React, { useState, useEffect } from "react";
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
  ChevronRight,
  ChevronDown,
  X,
  Tag,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { brandConfig } from "@/config/brand";
import { useCart, CartItem } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import SearchBox, { MobileSearchOverlay } from "@/components/new-ui/SearchBox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useCategory from "@/hooks/useCategory";

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

// ─── Category Mega-dropdown Card ─────────────────────────────────────────────

function CategoryMegaMenu({ categories }: { categories: Category[] }) {
  const [activeParent, setActiveParent] = useState<Category | null>(
    categories[0] ?? null
  );
  const [activeChild, setActiveChild] = useState<Category | null>(null);

  useEffect(() => {
    if (categories.length > 0) setActiveParent(categories[0]);
  }, [categories]);

  const childCategories = activeParent?.children ?? [];
  const grandChildren = activeChild?.children ?? [];

  return (
    <div className="flex w-[760px] rounded-xl overflow-hidden shadow-2xl border border-[#f0e0eb] bg-white">
      {/* Column 1 – Root categories */}
      <div className="w-48 bg-gradient-to-b from-[#fdf2f7] to-[#fce8f2] py-3 flex-shrink-0">
        <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[#CD2A75]/60">
          All Categories
        </p>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onMouseEnter={() => {
              setActiveParent(cat);
              setActiveChild(null);
            }}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-150 group",
              activeParent?.id === cat.id
                ? "bg-white text-[#CD2A75] font-semibold shadow-sm"
                : "text-gray-600 hover:text-[#CD2A75] hover:bg-white/60"
            )}
          >
            <span className="flex items-center gap-2.5">
              {cat.img ? (
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-5 h-5 rounded object-cover"
                />
              ) : (
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    activeParent?.id === cat.id
                      ? "bg-[#CD2A75]"
                      : "bg-gray-300 group-hover:bg-[#CD2A75]"
                  )}
                />
              )}
              {cat.name}
            </span>
            {(cat.children?.length ?? 0) > 0 && (
              <ChevronRight
                size={13}
                className={cn(
                  "transition-transform",
                  activeParent?.id === cat.id
                    ? "text-[#CD2A75] translate-x-0.5"
                    : "text-gray-300"
                )}
              />
            )}
          </button>
        ))}
      </div>

      {/* Column 2 – Sub-categories */}
      <div className="flex-1 border-x border-[#f0e0eb] py-4 px-4">
        {activeParent && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800">{activeParent.name}</p>
                {activeParent.description && (
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {activeParent.description}
                  </p>
                )}
              </div>
              <Link
                href={`/category/${activeParent.slug}`}
                className="text-xs text-[#CD2A75] hover:underline flex items-center gap-1"
              >
                View all <ArrowRight size={11} />
              </Link>
            </div>
            <Separator className="mb-3 bg-[#f0e0eb]" />
            {childCategories.length > 0 ? (
              <div className="grid grid-cols-2 gap-1">
                {childCategories.map((child) => (
                  <button
                    key={child.id}
                    onMouseEnter={() => setActiveChild(child)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 text-left group",
                      activeChild?.id === child.id
                        ? "bg-[#fdf2f7] text-[#CD2A75] font-medium"
                        : "text-gray-600 hover:bg-[#fdf2f7] hover:text-[#CD2A75]"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {child.img ? (
                        <img
                          src={child.img}
                          alt={child.name}
                          className="w-4 h-4 rounded object-cover"
                        />
                      ) : (
                        <Layers
                          size={12}
                          className="text-[#CD2A75]/40 group-hover:text-[#CD2A75] transition-colors"
                        />
                      )}
                      <span className="truncate">{child.name}</span>
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {child.totalProducts > 0 && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] h-4 px-1.5 bg-[#f5d6ea] text-[#CD2A75] border-0"
                        >
                          {child.totalProducts}
                        </Badge>
                      )}
                      {(child.children?.length ?? 0) > 0 && (
                        <ChevronRight size={11} className="text-gray-300" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-28 text-gray-300 gap-2">
                <Tag size={22} />
                <p className="text-xs">No subcategories</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Column 3 – Grand-children + promo */}
      <div className="w-44 py-4 px-3 flex flex-col gap-3 flex-shrink-0">
        {activeChild && grandChildren.length > 0 ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#CD2A75]/60 px-1">
              {activeChild.name}
            </p>
            <div className="flex flex-col gap-0.5">
              {grandChildren.map((gc) => (
                <Link
                  key={gc.id}
                  href={`/category/${gc.slug}`}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-gray-600 hover:bg-[#fdf2f7] hover:text-[#CD2A75] transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#CD2A75] transition-colors flex-shrink-0" />
                  {gc.name}
                </Link>
              ))}
            </div>
          </>
        ) : (
          /* Promo / featured card */
          <div className="rounded-xl bg-gradient-to-br from-[#CD2A75] to-[#a01f5a] text-white p-3.5 flex flex-col gap-2 mt-auto">
            <Sparkles size={18} className="opacity-80" />
            <p className="text-[11px] font-bold leading-snug">
              New Arrivals <br /> This Week
            </p>
            <p className="text-[10px] opacity-70">
              Fresh picks for your little one
            </p>
            <Link
              href="/new-arrivals"
              className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold bg-white/20 hover:bg-white/30 rounded-lg px-2.5 py-1 transition-colors"
            >
              Shop now <ArrowRight size={10} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Mobile Category Tree ─────────────────────────────────────────────────────

function MobileCategoryTree({
  categories,
  onClose,
}: {
  categories: Category[];
  onClose: () => void;
}) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const renderNode = (cat: Category, depth = 0) => {
    const hasChildren = (cat.children?.length ?? 0) > 0;
    const isOpen = expandedIds.has(cat.id);

    return (
      <div key={cat.id}>
        <div
          className={cn(
            "flex items-center justify-between",
            depth === 0
              ? "border-b border-gray-100"
              : "border-b border-gray-50"
          )}
          style={{ paddingLeft: `${16 + depth * 16}px` }}
        >
          <Link
            href={`/category/${cat.slug}`}
            onClick={onClose}
            className={cn(
              "flex-1 flex items-center gap-2.5 py-3 pr-2 text-sm",
              depth === 0
                ? "font-medium text-gray-700"
                : "text-gray-500",
              "hover:text-[#CD2A75] transition-colors"
            )}
          >
            {cat.img ? (
              <img
                src={cat.img}
                alt={cat.name}
                className="w-6 h-6 rounded object-cover flex-shrink-0"
              />
            ) : (
              <span
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  depth === 0 ? "bg-[#CD2A75]/40" : "bg-gray-200"
                )}
              />
            )}
            <span className="flex-1 truncate">{cat.name}</span>
            {cat.totalProducts > 0 && (
              <Badge
                variant="secondary"
                className="text-[9px] h-4 px-1.5 bg-[#fce8f2] text-[#CD2A75] border-0 flex-shrink-0"
              >
                {cat.totalProducts}
              </Badge>
            )}
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggle(cat.id)}
              className="p-3 text-gray-400 hover:text-[#CD2A75] transition-colors"
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
          )}
        </div>
        {hasChildren && isOpen && (
          <div className="bg-gray-50/60">
            {cat.children?.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return <div>{categories.map((c) => renderNode(c))}</div>;
}

// ─── Helper: Build Category Tree ─────────────────────────────────────────────

function buildCategoryTree(flat: Category[]): Category[] {
  const map = new Map<string, Category>();
  flat.forEach((c) => map.set(c.id, { ...c, children: [] }));
  const roots: Category[] = [];
  flat.forEach((c) => {
    const node = map.get(c.id);
    if (!node) return;

    if (c.parentId && map.has(c.parentId)) {
      const parent = map.get(c.parentId);
      if (parent && parent.children) {
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  });
  return roots;
}

// ─── Main Header ─────────────────────────────────────────────────────────────

export default function BabyBloomHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const { cart } = useCart();
  const { authState, logout } = useAuth();
  const { user, isAuthenticated } = authState;
  const pathname = usePathname();
  const { fetchCategories } = useCategory();

  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      if (data) setCategories(buildCategoryTree(data));
    })();
    // fetchCategories is stable from useCategory hook, buildCategoryTree is stable
  }, []);

  const cartCount =
    cart?.reduce((t: number, i: CartItem) => t + (i.quantity || 0), 0) ?? 0;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="bg-[#CD2A75]">
        <div className="container mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href={brandConfig.contact.phone.link}
              className="flex items-center gap-1.5 text-white/90 hover:text-white text-xs transition-colors"
            >
              <Phone size={11} />
              <span className="hidden sm:inline">
                {brandConfig.contact.phone.display}
              </span>
            </a>
            <a
              href={`mailto:${brandConfig.contact.email.address}`}
              className="hidden sm:flex items-center gap-1.5 text-white/90 hover:text-white text-xs transition-colors"
            >
              <Mail size={11} />
              {brandConfig.contact.email.display}
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/90">
            <Link
              href="/track-order"
              className="hover:text-white transition-colors hidden sm:block"
            >
              Track Order
            </Link>
            <Link href="/account" className="hover:text-white transition-colors">
              Account
            </Link>
            <Link
              href="/wishlist"
              className="hover:text-white transition-colors"
            >
              Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 h-16">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-[#fdf2f7] text-[#CD2A75] transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 mr-2">
              <Image
                src={brandConfig.assets.logo}
                alt={brandConfig.assets.logoAlt}
                width={120}
                height={40}
                className="h-9 w-auto"
                priority
              />
            </Link>

            {/* ── Desktop nav + mega dropdown ──────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
              {/* "All Categories" mega trigger */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button
                  aria-label="Browse categories"
                  aria-expanded={isCategoryOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150",
                    isCategoryOpen
                      ? "bg-[#CD2A75] text-white"
                      : "text-gray-700 hover:bg-[#fdf2f7] hover:text-[#CD2A75]"
                  )}
                >
                  <Layers size={15} />
                  Categories
                  <ChevronDown
                    size={13}
                    className={cn(
                      "transition-transform duration-200",
                      isCategoryOpen && "rotate-180"
                    )}
                  />
                </button>

                {isCategoryOpen && categories.length > 0 && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50"
                    role="region"
                    aria-label="Categories menu"
                  >
                    <CategoryMegaMenu categories={categories} />
                  </div>
                )}
              </div>

              {/* Quick nav links */}
              {[
                { label: "New Arrivals", href: "/new-arrivals" },
                { label: "Best Sellers", href: "/best-sellers" },
                { label: "Brands", href: "/brands" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-[#fdf2f7] text-[#CD2A75]"
                      : "text-gray-600 hover:bg-[#fdf2f7] hover:text-[#CD2A75]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/sale"
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1"
              >
                <Tag size={13} />
                Sale
              </Link>
            </nav>

            {/* Search – desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-auto">
              <SearchBox />
            </div>

            {/* ── Action icons ──────────────────────────────────────────── */}
            <div className="flex items-center gap-0.5 flex-shrink-0 ml-auto lg:ml-0">
              {/* Search trigger (mobile) */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-[#fdf2f7] text-gray-500 hover:text-[#CD2A75] transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex p-2 rounded-lg hover:bg-[#fdf2f7] text-gray-500 hover:text-[#CD2A75] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              {/* User */}
              <Link
                href="/account"
                className="p-2 rounded-lg hover:bg-[#fdf2f7] text-gray-500 hover:text-[#CD2A75] transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 pl-2 pr-3 py-2 rounded-lg bg-[#CD2A75] hover:bg-[#b02165] text-white transition-colors ml-1"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                <span className="text-sm font-semibold hidden sm:block">
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#CD2A75] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow border border-[#CD2A75]/20">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Search Overlay ─────────────────────────────────────────── */}
      <MobileSearchOverlay
        open={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />

      {/* ── Mobile Side Sheet ─────────────────────────────────────────────── */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[320px] p-0 flex flex-col">
          {/* Sheet header */}
          <SheetHeader className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                <Layers size={17} className="text-[#CD2A75]" />
                Shop by Category
              </SheetTitle>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            {/* User quick actions */}
            <div className="px-4 py-3 flex gap-2 border-b border-gray-100">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#CD2A75] hover:text-[#CD2A75] transition-colors"
                  >
                    <User size={13} /> Account
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#CD2A75] hover:text-[#CD2A75] transition-colors"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:border-red-400 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#CD2A75] text-white text-sm font-semibold hover:bg-[#b02165] transition-colors"
                >
                  <User size={14} /> Login / Sign Up
                </Link>
              )}
            </div>

            {/* Promo banner */}
            <div className="mx-4 mt-3 mb-1 rounded-xl overflow-hidden bg-gradient-to-r from-[#CD2A75] to-[#a01f5a] p-3.5 flex items-center justify-between">
              <div>
                <p className="text-white text-xs font-bold">🎉 New Arrivals</p>
                <p className="text-white/70 text-[10px] mt-0.5">
                  Fresh picks for your little one
                </p>
              </div>
              <Link
                href="/new-arrivals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                Shop <ArrowRight size={10} />
              </Link>
            </div>

            {/* Quick links */}
            <div className="flex gap-2 px-4 py-3">
              {[
                { label: "Best Sellers", href: "/best-sellers" },
                { label: "Sale", href: "/sale" },
                { label: "Brands", href: "/brands" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex-1 text-center py-1.5 rounded-lg text-xs font-medium transition-colors",
                    l.label === "Sale"
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "bg-gray-100 text-gray-600 hover:bg-[#fdf2f7] hover:text-[#CD2A75]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <Separator className="mx-4 my-1" />

            {/* Category tree */}
            <div className="pb-6">
              <p className="px-5 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                Categories
              </p>
              <MobileCategoryTree
                categories={categories}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  );
}
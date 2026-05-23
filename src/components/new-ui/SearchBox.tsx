"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  Package,
  Tag,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useSearchProduct from "@/hooks/useProductSearch";

// ─── Constants ────────────────────────────────────────────────────────────────

const TRENDING = [
  "Baby rompers",
  "Feeding bottles",
  "Diaper bags",
  "Soft toys",
  "Nursing covers",
  "Baby shoes",
];
const RECENT_KEY = "bb_recent_searches";

function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]").slice(0, 6);
  } catch {
    return [];
  }
}

function saveRecent(term: string) {
  if (typeof window === "undefined") return;
  const prev = getRecent().filter((s) => s !== term);
  localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...prev].slice(0, 6)));
}

function removeRecent(term: string) {
  if (typeof window === "undefined") return;
  const next = getRecent().filter((s) => s !== term);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function fmt(price: number) {
  return `৳${price.toLocaleString()}`;
}

// ─── Product row ──────────────────────────────────────────────────────────────

function ProductRow({
  product,
  onSelect,
  compact = false,
}: {
  product: any;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  const discount =
    product.hasDiscount && product.updatedPrice
      ? Math.round(
          ((product.unitPrice - product.updatedPrice) / product.unitPrice) *
            100,
        )
      : null;

  return (
    <button
      onClick={() => onSelect(product.id)}
      className='w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf2f7] active:bg-[#fce8f2] transition-colors duration-100 group text-left'>
      {/* Thumbnail */}
      <div
        className={cn(
          "rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 relative",
          compact ? "w-10 h-10" : "w-12 h-12",
        )}>
        {product.images?.length > 0 ? (
          <Image
            src={product.thumbnail ?? product.images[0]}
            alt={product.name}
            fill
            className='object-cover'
            sizes='48px'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-300'>
            <Package size={16} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-gray-800 truncate group-hover:text-[#CD2A75] transition-colors leading-snug'>
          {product.name}
        </p>
        <div className='flex items-center gap-1.5 mt-0.5 flex-wrap'>
          {product.categoryName && (
            <span className='text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5'>
              {product.categoryName}
            </span>
          )}
          <span className='text-sm font-bold text-[#CD2A75]'>
            {fmt(product.updatedPrice || product.unitPrice)}
          </span>
          {discount && (
            <span className='text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5'>
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Stock */}
      <div className='flex-shrink-0 flex flex-col items-end gap-1'>
        <span
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full",
            product.quantity > 0
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-400",
          )}>
          {product.quantity > 0 ? "In stock" : "Out"}
        </span>
        <ChevronRight
          size={12}
          className='text-gray-300 group-hover:text-[#CD2A75] transition-colors'
        />
      </div>
    </button>
  );
}

// ─── Results panel (shared) ───────────────────────────────────────────────────

function ResultsPanel({
  inputValue,
  loading,
  products,
  recent,
  onSelect,
  onSubmit,
  onRecentClick,
  onRecentRemove,
  onTrendingClick,
  compact = false,
}: {
  inputValue: string;
  loading: boolean;
  products: any[];
  recent: string[];
  onSelect: (id: string) => void;
  onSubmit: () => void;
  onRecentClick: (t: string) => void;
  onRecentRemove: (t: string) => void;
  onTrendingClick: (t: string) => void;
  compact?: boolean;
}) {
  const hasQuery = inputValue.trim().length > 0;

  if (loading) {
    return (
      <div className='py-10 flex flex-col items-center gap-3'>
        <div className='w-7 h-7 rounded-full border-2 border-[#CD2A75]/20 border-t-[#CD2A75] animate-spin' />
        <p className='text-sm text-gray-400'>Searching…</p>
      </div>
    );
  }

  if (hasQuery && products.length === 0) {
    return (
      <div className='py-10 flex flex-col items-center gap-2 text-center px-6'>
        <div className='w-14 h-14 rounded-2xl bg-[#fdf2f7] flex items-center justify-center mb-1'>
          <Search size={22} className='text-[#CD2A75]/40' />
        </div>
        <p className='text-sm font-semibold text-gray-600'>
          No results for - {inputValue}
        </p>
        <p className='text-xs text-gray-400 mt-0.5'>
          Try a different keyword or browse our categories
        </p>
      </div>
    );
  }

  if (hasQuery && products.length > 0) {
    return (
      <div>
        <div className='px-4 py-2 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10'>
          <span className='text-[11px] font-semibold uppercase tracking-widest text-gray-400'>
            Products
          </span>
          <span className='text-[10px] text-[#CD2A75] font-medium'>
            {products.length} results
          </span>
        </div>
        <div className='divide-y divide-gray-50/80'>
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onSelect={onSelect}
              compact={compact}
            />
          ))}
        </div>
        <div className='border-t border-gray-100 mt-1'>
          <button
            onClick={onSubmit}
            className='w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#CD2A75] hover:bg-[#fdf2f7] active:bg-[#fce8f2] transition-colors'>
            See all results for - {inputValue}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Idle state
  return (
    <div>
      {recent.length > 0 && (
        <div className='py-2'>
          <div className='px-4 pb-1.5 pt-1 flex items-center justify-between'>
            <span className='text-[10px] font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5'>
              <Clock size={10} /> Recent searches
            </span>
          </div>
          {recent.map((term) => (
            <div
              key={term}
              className='flex items-center group hover:bg-[#fdf2f7] transition-colors'>
              <button
                onClick={() => onRecentClick(term)}
                className='flex-1 flex items-center gap-3 px-4 py-2.5 text-left'>
                <Clock size={13} className='text-gray-300 flex-shrink-0' />
                <span className='text-sm text-gray-600 group-hover:text-[#CD2A75] transition-colors truncate'>
                  {term}
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRecentRemove(term);
                }}
                className='pr-4 pl-2 py-2.5 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-all'
                aria-label='Remove'>
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={cn("py-3", recent.length > 0 && "border-t border-gray-100")}>
        <p className='px-4 pb-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5'>
          <TrendingUp size={10} /> Trending now
        </p>
        <div className='px-4 flex flex-wrap gap-2'>
          {TRENDING.map((term) => (
            <button
              key={term}
              onClick={() => onTrendingClick(term)}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-[#fdf2f7] hover:text-[#CD2A75] border border-gray-100 hover:border-[#f0c8e0] text-xs text-gray-600 active:bg-[#fce8f2] transition-all duration-100'>
              <Tag size={9} className='text-[#CD2A75]/50' />
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Desktop SearchBox ────────────────────────────────────────────────────────

function DesktopSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const { loading, products, inputValue, setInputValue } = useSearchProduct();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setRecent(getRecent());
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const submit = useCallback(() => {
    if (!inputValue.trim()) return;
    saveRecent(inputValue.trim());
    router.push(`/collections?search=${encodeURIComponent(inputValue)}`);
    setInputValue("");
    setOpen(false);
  }, [inputValue, router, setInputValue]);

  const handleRemoveRecent = (term: string) => {
    removeRecent(term);
    setRecent(getRecent());
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center h-10 rounded-full border-2 transition-all duration-200",
          open
            ? "border-[#CD2A75] shadow-[0_0_0_3px_#CD2A7518] bg-white"
            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white",
        )}>
        <Search
          size={15}
          className={cn(
            "ml-3.5 flex-shrink-0 transition-colors duration-200",
            open ? "text-[#CD2A75]" : "text-gray-400",
          )}
        />
        <input
          ref={inputRef}
          type='text'
          placeholder='Search products…'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className='flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none px-2.5'
          autoComplete='off'
        />
        {inputValue ? (
          <button
            onClick={() => {
              setInputValue("");
              inputRef.current?.focus();
            }}
            className='mr-1 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'>
            <X size={13} />
          </button>
        ) : (
          <span className='mr-2.5 text-[10px] text-gray-300 border border-gray-200 rounded px-1.5 py-0.5 hidden xl:flex items-center gap-0.5'>
            ⌘K
          </span>
        )}
        <button
          onClick={submit}
          disabled={!inputValue}
          className={cn(
            "mr-1.5 flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-150 flex-shrink-0",
            inputValue
              ? "bg-[#CD2A75] text-white hover:bg-[#b02165] shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          )}>
          Search
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden z-[60]'>
          <ResultsPanel
            inputValue={inputValue}
            loading={loading}
            products={products}
            recent={recent}
            onSelect={(id) => {
              router.push(`/collections/${id}`);
              setInputValue("");
              setOpen(false);
            }}
            onSubmit={submit}
            onRecentClick={(t) => {
              setInputValue(t);
              inputRef.current?.focus();
            }}
            onRecentRemove={handleRemoveRecent}
            onTrendingClick={(t) => {
              setInputValue(t);
              inputRef.current?.focus();
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Mobile full-screen search overlay ───────────────────────────────────────
//
// Strategy: fixed full-screen overlay that slides down from the top.
// - Input is pinned at the very top → always visible above the keyboard
// - Results scroll in the space BELOW the input
// - No bottom sheet → keyboard never pushes anything off screen
// - `env(safe-area-inset-top)` respects iOS notch / status bar
//
export function MobileSearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [recent, setRecent] = useState<string[]>([]);
  const { loading, products, inputValue, setInputValue } = useSearchProduct();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input after animation frame so transform is done
  useEffect(() => {
    if (open) {
      setRecent(getRecent());
      // rAF ensures the element is painted before we focus (avoids scroll jump)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      });
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      setInputValue("");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, setInputValue]);

  // Scroll results to top whenever query changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [inputValue]);

  const submit = useCallback(() => {
    if (!inputValue.trim()) return;
    saveRecent(inputValue.trim());
    router.push(`/collections?search=${encodeURIComponent(inputValue)}`);
    setInputValue("");
    onClose();
  }, [inputValue, router, setInputValue, onClose]);

  const handleRemoveRecent = (term: string) => {
    removeRecent(term);
    setRecent(getRecent());
  };

  if (!open) return null;

  return (
    // Fixed overlay — covers entire viewport, sits above everything
    <div
      className='fixed inset-0 z-[200] flex flex-col bg-white'
      style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* ── Top bar: back button + input ────────────────────────────────── */}
      <div className='flex-shrink-0 flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 bg-white shadow-sm'>
        {/* Back */}
        <button
          onClick={onClose}
          className='flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-600'
          aria-label='Close search'>
          <ArrowLeft size={20} />
        </button>

        {/* Input wrapper */}
        <div
          className={cn(
            "flex-1 flex items-center h-11 rounded-2xl border-2 transition-all duration-150",
            inputValue
              ? "border-[#CD2A75] bg-white"
              : "border-gray-200 bg-gray-50",
          )}>
          <Search
            size={16}
            className={cn(
              "ml-3.5 flex-shrink-0",
              inputValue ? "text-[#CD2A75]" : "text-gray-400",
            )}
          />
          <input
            ref={inputRef}
            type='search'
            inputMode='search'
            enterKeyHint='search'
            placeholder='What are you looking for?'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            // Prevent iOS bounce scroll pulling the overlay
            onTouchStart={(e) => e.stopPropagation()}
            className='flex-1 bg-transparent text-[15px] text-gray-800 placeholder:text-gray-400 outline-none px-2.5 py-0 min-w-0'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck={false}
          />
          {inputValue && (
            <button
              onMouseDown={(e) => e.preventDefault()} // keep keyboard open
              onClick={() => setInputValue("")}
              className='mr-3 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 active:bg-gray-300 transition-colors flex-shrink-0'>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Search CTA — only shown when there's a query */}
        {inputValue && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={submit}
            className='flex-shrink-0 h-11 px-4 rounded-2xl bg-[#CD2A75] text-white text-sm font-semibold active:bg-[#b02165] transition-colors shadow-sm'>
            Go
          </button>
        )}
      </div>

      {/* ── Scrollable results ───────────────────────────────────────────── */}
      {/*
        Key UX detail: this div fills all remaining space ABOVE the keyboard.
        Because the input is at the top (not bottom), the keyboard pushing up
        from the bottom only shrinks this scroll area — the input stays visible.
        We use `-webkit-overflow-scrolling: touch` via the class for momentum.
      */}
      <div
        ref={scrollRef}
        className='flex-1 overflow-y-auto overscroll-y-contain'
        // Allow the div to shrink when the keyboard opens
        style={{ WebkitOverflowScrolling: "touch" }}>
        <ResultsPanel
          inputValue={inputValue}
          loading={loading}
          products={products}
          recent={recent}
          onSelect={(id) => {
            router.push(`/collections/${id}`);
            setInputValue("");
            onClose();
          }}
          onSubmit={submit}
          onRecentClick={(t) => {
            setInputValue(t);
            // brief timeout lets state update before input re-focuses
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          onRecentRemove={handleRemoveRecent}
          onTrendingClick={(t) => {
            setInputValue(t);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          compact
        />
      </div>
    </div>
  );
}

// ─── Default export ───────────────────────────────────────────────────────────

interface SearchBoxProps {
  className?: string;
}

export default function SearchBox({ className }: SearchBoxProps) {
  return <DesktopSearch className={className} />;
}

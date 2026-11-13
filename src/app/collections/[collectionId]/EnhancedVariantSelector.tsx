"use client";
import * as React from "react";
import { X } from "lucide-react";
import { cn, defaultProdcutImg } from "@/lib/utils";
import { toast } from "sonner";
import { SingleProductType, Variation } from "@/data/types";
import Swal from "sweetalert2";

interface Props {
  type: "size" | "color";
  selectedProduct: SingleProductType;
  list: string[];
  selected: string;
  selectedVariant: Variation | null;
  onVariantChange: (variant: Variation) => void;
  onImageGroupChange?: (
    attribute: string,
    value: string,
    groupId: string,
  ) => void;
}

// Requests a small square crop for Cloudinary-hosted images; other hosts pass through unchanged.
const toThumbUrl = (url: string) =>
  url.includes("res.cloudinary.com/image/upload/")
    ? url.replace("/image/upload/", "/image/upload/w_80,h_80,c_fill,f_auto,q_auto/")
    : url;

const EnhancedVariantSelector: React.FC<Props> = ({
  type,
  selectedProduct,
  list,
  selected,
  selectedVariant,
  onVariantChange,
  onImageGroupChange,
}) => {
  const [variations, setVariations] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!!selectedProduct && !!selectedProduct?.variation) {
      setVariations(selectedProduct?.variation ?? []);
    }
  }, [selectedProduct]);

  // Per-color thumbnail: prefer an in-stock variation's image, then its group image,
  // then the product thumbnail. Matches by color only so out-of-stock size combos
  // don't zero out candidates.
  const colorThumbnails = React.useMemo(() => {
    const map: Record<string, string> = {};
    (list || []).forEach((color) => {
      if (!color?.trim()) return;
      const matches = variations.filter(
        (v: Variation) =>
          !!v.color &&
          (v.color === color || v.color.includes(color) || color.includes(v.color)),
      );
      if (!matches.length) return;
      const inStock = matches.filter((v) => (v.quantity ?? 0) > 0);
      const ordered = inStock.length ? [...inStock, ...matches] : matches;
      let src: string | undefined;
      for (const v of ordered) if (v.image) { src = v.image; break; }
      if (!src) for (const v of ordered) if (v.images?.[0]) { src = v.images[0]; break; }
      if (!src)
        for (const v of ordered) {
          if (v.imageGroupId) {
            const g = selectedProduct.imageGroups?.find((ig) => ig.id === v.imageGroupId);
            if (g?.images?.[0]) { src = g.images[0]; break; }
          }
        }
      map[color] = toThumbUrl(src || selectedProduct.thumbnail || defaultProdcutImg);
    });
    return map;
  }, [variations, list, selectedProduct]);

  const handleVariantChange = (value: string) => {
    const vType: "size" | "color" = type;
    const rType = vType === "color" ? "size" : "color";
    const selectedRev = selectedVariant ? selectedVariant[rType] ?? "" : "";

    const filteredVariants = variations.filter((variant: Variation) => {
      const typeMatch =
        value === "" ||
        variant[vType] === "" ||
        variant[vType].includes(value);
      const reverseMatch =
        selectedRev === "" ||
        variant[rType] === "" ||
        variant[rType].includes(selectedRev);
      return typeMatch && reverseMatch;
    });

    if (filteredVariants.length > 0) {
      const selectedVariantData = filteredVariants[0];

      if (
        type === "color" &&
        onImageGroupChange &&
        selectedVariantData?.imageGroupId
      ) {
        const group = selectedProduct.imageGroups?.find(
          (g) => g.id === selectedVariantData.imageGroupId,
        );
        if (group) {
          onImageGroupChange(group.attribute, group.value, group.id);
        }
      }

      onVariantChange(selectedVariantData);
    } else {
      Swal.fire({
        title: "Out Of Stock",
        text: "This variant is currently out of stock",
        icon: "error",
        confirmButtonColor: "#CD2A75",
        confirmButtonText: "OK",
      });
    }
  };

  const getVariantInfo = (value: string) => {
    const vType: "size" | "color" = type;
    const rType = vType === "color" ? "size" : "color";
    const selectedRev = selectedVariant ? selectedVariant[rType] ?? "" : "";

    const filteredVariants = variations.filter((variant: Variation) => {
      const typeMatch =
        value === "" ||
        variant[vType] === "" ||
        variant[vType].includes(value);
      const reverseMatch =
        selectedRev === "" ||
        variant[rType] === "" ||
        variant[rType].includes(selectedRev);
      return typeMatch && reverseMatch;
    });

    const totalQuantity = filteredVariants.reduce(
      (sum, variant) => sum + (variant.quantity || 0),
      0,
    );
    const isAvailable = totalQuantity > 0;

    return { quantity: totalQuantity, isAvailable };
  };

  if (!list || list.length === 0) return null;
  const visibleList = list.filter((v) => v.trim() !== "");
  if (visibleList.length === 0) return null;

  // ─── COLOR SELECTOR ──────────────────────────────────────────────────
  if (type === "color") {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">Color</span>
          {selected && (
            <span className="text-xs text-gray-400">
              {selected.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleList.map((value, index) => {
            const variantInfo = getVariantInfo(value);
            const isSelected = selected === value;
            const isOutOfStock = !variantInfo.isAvailable;

            return (
              <button
                key={index}
                disabled={isOutOfStock}
                onClick={() => {
                  if (isOutOfStock) {
                    toast.error(`${value.toUpperCase()} is out of stock`);
                  } else {
                    handleVariantChange(value);
                  }
                }}
                className={cn(
                  "group relative flex flex-col items-center gap-1.5 px-3 pt-2 pb-1.5 rounded-xl text-xs font-medium transition-all duration-200 border",
                  isSelected &&
                    "bg-babybloom-pink/10 text-babybloom-pink border-babybloom-pink shadow-sm",
                  !isSelected &&
                    !isOutOfStock &&
                    "bg-white text-gray-600 border-gray-200 hover:border-babybloom-pink/40 hover:text-babybloom-pink",
                  isOutOfStock &&
                    "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed",
                )}>
                <span className="relative shrink-0">
                  <img
                    src={colorThumbnails[value] || defaultProdcutImg}
                    alt={value}
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = defaultProdcutImg;
                    }}
                    className={cn(
                      "w-12 h-12 rounded-lg object-cover border border-gray-200 bg-gray-100",
                      isSelected && "ring-2 ring-babybloom-pink ring-offset-1",
                      isOutOfStock && "grayscale opacity-60",
                    )}
                  />
                  {isOutOfStock && (
                    <X className="absolute -top-1 -right-1 w-3 h-3 text-red-400 bg-white rounded-full border border-red-100" />
                  )}
                </span>
                <span className="leading-none whitespace-nowrap">
                  {value.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── SIZE SELECTOR ───────────────────────────────────────────────────
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">Size</span>
        {selected && (
          <span className="text-xs text-gray-400">
            {selected.toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {visibleList.map((value, index) => {
          const variantInfo = getVariantInfo(value);
          const isSelected = selected === value;
          const isOutOfStock = !variantInfo.isAvailable;

          return (
            <button
              key={index}
              disabled={isOutOfStock}
              onClick={() => {
                if (isOutOfStock) {
                  toast.error(`${value.toUpperCase()} is out of stock`);
                } else {
                  handleVariantChange(value);
                }
              }}
              className={cn(
                "relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border",
                isSelected &&
                  "bg-babybloom-pink text-white border-babybloom-pink shadow-lg shadow-babybloom-pink/20",
                !isSelected &&
                  !isOutOfStock &&
                  "bg-white text-gray-700 border-gray-200 hover:border-babybloom-pink/40 hover:text-babybloom-pink hover:bg-babybloom-pink/5",
                isOutOfStock &&
                  "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed line-through",
              )}>
              {value.toUpperCase()}
              {isOutOfStock && (
                <X className="absolute -top-1.5 -right-1.5 w-4 h-4 text-red-400 bg-white rounded-full border border-red-100" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedVariantSelector;

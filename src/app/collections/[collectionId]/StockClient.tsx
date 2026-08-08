"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface StockClientProps {
  productId: string;
  initialStock?: number;
  initialPrice?: number;
  onStockUpdate?: (stock: number, price: number) => void;
}

export default function StockClient({
  productId,
  initialStock = 0,
  initialPrice = 0,
  onStockUpdate,
}: StockClientProps) {
  const [stock, setStock] = useState(initialStock);
  const [price, setPrice] = useState(initialPrice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch real-time stock immediately on mount
    const fetchLiveStock = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/stock`,
          {
            cache: 'no-store',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch stock');
        }

        const data = await response.json();
        const newStock = data.stock ?? 0;
        const newPrice = data.price ?? price;

        setStock(newStock);
        setPrice(newPrice);

        // Notify parent component of stock update
        if (onStockUpdate) {
          onStockUpdate(newStock, newPrice);
        }
      } catch (err) {
        console.error('Stock fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStock();

    // Refresh stock every 15 seconds for real-time updates
    const interval = setInterval(fetchLiveStock, 15000);

    return () => clearInterval(interval);
  }, [productId, price]); // Don't include onStockUpdate to avoid infinite loops

  return (
    <div className="flex items-center gap-2">
      {loading && stock === initialStock && !error ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
          <span className="text-sm text-neutral-500">Checking stock...</span>
        </div>
      ) : error ? (
        <span className="text-yellow-600 text-sm">Stock unavailable</span>
      ) : stock > 0 ? (
        <>
          <span className="text-green-600 font-medium text-sm">
            In Stock{stock < 10 && ` (${stock} left)`}
          </span>
          {price > 0 && (
            <span className="text-neutral-900 font-semibold">
              ৳{price.toLocaleString()}
            </span>
          )}
        </>
      ) : (
        <span className="text-red-600 font-medium text-sm">Out of Stock</span>
      )}
    </div>
  );
}

/**
 * Stock display component (simpler version for showing only)
 */
export function StockDisplay({ stock, price }: { stock: number; price: number }) {
  return (
    <div className="flex items-center gap-2">
      {stock > 0 ? (
        <>
          <span className="text-green-600 font-medium text-sm">
            In Stock{stock < 10 && ` (${stock} left)`}
          </span>
          {price > 0 && (
            <span className="text-neutral-900 font-semibold">
              ৳{price.toLocaleString()}
            </span>
          )}
        </>
      ) : (
        <span className="text-red-600 font-medium text-sm">Out of Stock</span>
      )}
    </div>
  );
}

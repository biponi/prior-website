"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { config } from "@/lib/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  PackageOpen,
  Hash,
  Calendar,
  ArrowRight,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Loader2,
} from "lucide-react";
import { isValidBangladeshiPhoneNumber } from "@/utils/content";

interface OrderItem {
  id: string;
  orderNumber: number;
  status: string;
  totalPrice: number;
  paid: number;
  remaining: number;
  createdAt: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  pending: { label: "Pending", color: "text-amber-600 bg-amber-50", icon: Clock },
  processing: { label: "Processing", color: "text-blue-600 bg-blue-50", icon: Loader2 },
  shipped: { label: "Shipped", color: "text-purple-600 bg-purple-50", icon: Truck },
  completed: { label: "Completed", color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "text-red-600 bg-red-50", icon: XCircle },
  cancel: { label: "Cancelled", color: "text-red-600 bg-red-50", icon: XCircle },
  failed: { label: "Failed", color: "text-red-600 bg-red-50", icon: XCircle },
};

function getStatusBadge(status: string) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    color: "text-neutral-600 bg-neutral-50",
    icon: PackageOpen,
  };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

export default function TrackOrderPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const normalizedPhone = cleanPhone.startsWith("880")
      ? cleanPhone
      : cleanPhone.startsWith("0")
        ? `880${cleanPhone.slice(1)}`
        : cleanPhone;

    if (!isValidBangladeshiPhoneNumber(phone)) {
      setError("Please enter a valid Bangladeshi phone number");
      return;
    }

    setError("");
    setLoading(true);
    setSearched(false);

    try {
      const url = config.order.lookupByPhone(normalizedPhone, 1, 50);
      const response = await axios.get(url, { timeout: 10000 });

      const data = response.data?.data;
      const orderList = data?.orders || [];

      setOrders(orderList);
      setSearched(true);

      // Single order → auto redirect
      if (orderList.length === 1) {
        router.push(`/order/${orderList[0].orderNumber}`);
      }
    } catch (err) {
      console.error("Error looking up orders:", err);
      setError("Something went wrong. Please try again.");
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSelectOrder = (orderNumber: number) => {
    router.push(`/order/${orderNumber}`);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-white border-b border-neutral-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-indigo-500/[0.02]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-medium text-blue-700 mb-4">
              <Search className="w-3 h-3" />
              Order Tracking
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
              Track Your Orders
            </h1>
            <p className="mt-3 text-neutral-500 text-sm sm:text-base max-w-lg mx-auto">
              Enter your phone number to find your recent orders
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search Card */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Find Your Orders
              </h2>
              <p className="text-sm text-neutral-500">
                Orders from the last 90 days
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                className="h-12 pl-10 rounded-xl border-neutral-200 text-base"
                disabled={loading}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || !phone.trim()}
              className="h-12 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium transition-colors">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>

        {/* Results */}
        {searched && !loading && (
          <div className="mt-6">
            {/* No Orders Found */}
            {orders.length === 0 && (
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 sm:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center mx-auto mb-5">
                  <PackageOpen className="w-10 h-10 text-neutral-300" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  No orders found
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
                  We couldn&apos;t find any orders for this phone number in the
                  last 90 days. Please check the number and try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPhone("");
                    setSearched(false);
                    setOrders([]);
                  }}
                  className="rounded-xl">
                  Try Another Number
                </Button>
              </div>
            )}

            {/* Single Order - Redirecting */}
            {orders.length === 1 && (
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8 text-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-sm text-neutral-500">
                  Found one order. Redirecting...
                </p>
              </div>
            )}

            {/* Multiple Orders */}
            {orders.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-neutral-900">
                    {orders.length} orders found
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Select an order to view details
                  </p>
                </div>

                <div className="space-y-3">
                  {orders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => handleSelectOrder(order.orderNumber)}
                      className="w-full bg-white rounded-xl border border-neutral-100 shadow-sm p-4 sm:p-5 text-left hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/[0.04] transition-all duration-200 group cursor-pointer">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Order Number */}
                          <div className="w-11 h-11 rounded-xl bg-neutral-50 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
                            <Hash className="w-5 h-5 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-base font-semibold text-neutral-900">
                                #{order.orderNumber}
                              </span>
                              {getStatusBadge(order.status)}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-neutral-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(order.createdAt)}
                              </span>
                              <span>{formatTime(order.createdAt)}</span>
                              <span className="font-medium text-neutral-700">
                                ৳{order.totalPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Banknote, Wallet } from "lucide-react";
import Image from "next/image";
import BkashLogo from "@/images/BKash-Icon-Logo.wine.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  prePaymentAmount?: number;
  deliveryCharge?: number;
  paymentMethod: string;
  handlePaymentMethodChange: (value: string) => void;
}

const PaymentMethod: FC<Props> = ({
  prePaymentAmount = 0,
  deliveryCharge = 0,
  paymentMethod,
  handlePaymentMethodChange,
}) => {
  const codLabel =
    !!prePaymentAmount && prePaymentAmount > 0
      ? `Cash on Delivery (Advance ৳${prePaymentAmount})`
      : deliveryCharge >= 80
        ? `Cash on Delivery (Advance ৳${deliveryCharge})`
        : "Cash on Delivery";

  return (
    <Card className="rounded-2xl border-neutral-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center font-semibold text-neutral-900 text-base">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mr-2.5">
            <Wallet className="h-4 w-4 text-neutral-600" />
          </div>
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* COD */}
          <button
            onClick={() => handlePaymentMethodChange("cashondelivery")}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left",
              paymentMethod === "cashondelivery"
                ? "border-neutral-900 bg-neutral-50"
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50",
            )}>
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200",
                paymentMethod === "cashondelivery"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-500",
              )}>
              <Banknote className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                Cash on Delivery
              </p>
              {(!!prePaymentAmount && prePaymentAmount > 0) ||
              deliveryCharge >= 80 ? (
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Advance ৳
                  {(prePaymentAmount > 0
                    ? prePaymentAmount
                    : deliveryCharge
                  ).toLocaleString()}{" "}
                  required
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Pay when you receive
                </p>
              )}
            </div>
            {/* Radio indicator */}
            <div
              className={cn(
                "ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200",
                paymentMethod === "cashondelivery"
                  ? "border-neutral-900"
                  : "border-neutral-300",
              )}>
              {paymentMethod === "cashondelivery" && (
                <div className="w-2 h-2 rounded-full bg-neutral-900" />
              )}
            </div>
          </button>

          {/* bKash */}
          <button
            onClick={() => handlePaymentMethodChange("bkash")}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left",
              paymentMethod === "bkash"
                ? "border-neutral-900 bg-neutral-50"
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50",
            )}>
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden transition-colors duration-200",
                paymentMethod === "bkash"
                  ? "bg-[#E2136E]/10"
                  : "bg-neutral-100",
              )}>
              <Image
                src={BkashLogo}
                width={24}
                height={24}
                className="object-contain"
                alt="bKash"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900">
                Pay with bKash
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Secure online payment
              </p>
            </div>
            {/* Radio indicator */}
            <div
              className={cn(
                "ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200",
                paymentMethod === "bkash"
                  ? "border-neutral-900"
                  : "border-neutral-300",
              )}>
              {paymentMethod === "bkash" && (
                <div className="w-2 h-2 rounded-full bg-neutral-900" />
              )}
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;

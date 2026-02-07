"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";

interface PaywallProps {
  feature: string;
  claimId?: string;
  children: React.ReactNode;
  isPaid?: boolean;
}

export function Paywall({ feature, claimId, children, isPaid = false }: PaywallProps) {
  const [loading, setLoading] = useState(false);

  if (isPaid) {
    return <>{children}</>;
  }

  async function handleCheckout(priceType: "per_claim" | "pro") {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType, claimId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
        <div className="text-center p-8 max-w-md">
          <div className="w-12 h-12 rounded-full bg-ink-50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-ink-800" />
          </div>
          <h3 className="font-serif text-heading text-ink-800 mb-2">
            Unlock {feature}
          </h3>
          <p className="text-body-sm text-slate-500 mb-6">
            Get the full AI-powered toolkit to maximize your settlement.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => handleCheckout("per_claim")}
              loading={loading}
              className="w-full bg-ink-800 hover:bg-ink-900"
            >
              Unlock this claim &mdash; $79
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <button
              onClick={() => handleCheckout("pro")}
              className="text-body-sm text-ink-800 hover:text-ink-900 font-medium"
            >
              Or go Pro &mdash; $49/mo billed quarterly
            </button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

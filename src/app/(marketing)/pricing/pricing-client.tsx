"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function PricingButton({
  priceType,
  variant = "primary",
  children,
}: {
  priceType: "per_claim" | "pro";
  variant?: "primary" | "outline";
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = "/signup";
      }
    } catch {
      window.location.href = "/signup";
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size="md"
      className="w-full"
      loading={loading}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export { ArrowRight };

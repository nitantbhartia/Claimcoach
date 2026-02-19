import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABoxProps {
  heading?: string;
  body?: string;
  href?: string;
  label?: string;
}

export function CTABox({
  heading = "Find out what your offer is missing",
  body = "ClaimCoach analyzes your settlement offer in under 2 minutes and shows you exactly which line items are below fair value.",
  href = "/claims/new",
  label = "Check my offer free",
}: CTABoxProps) {
  return (
    <div className="border-2 border-coral/40 bg-coral/5 p-5 my-6">
      <p className="text-body font-semibold text-black mb-1">{heading}</p>
      <p className="text-body-sm text-[#4a555e] mb-4">{body}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 bg-black text-white text-body-sm font-medium px-4 py-2.5 hover:bg-coral hover:text-black transition-colors"
      >
        {label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

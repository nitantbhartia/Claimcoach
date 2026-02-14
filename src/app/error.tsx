"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-panel flex items-center justify-center">
      <div className="text-center px-5 py-20 max-w-md">
        <div className="w-12 h-12 bg-coral/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-heading font-bold text-coral">!</span>
        </div>
        <h1 className="text-heading-lg text-black mb-2">
          Something went wrong
        </h1>
        <p className="text-body text-[#4a555e] mb-8">
          An unexpected error occurred. Please try again or return to the
          homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-5 py-2.5 border-2 border-black text-black text-body-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

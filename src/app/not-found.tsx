import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-5 py-20">
          <p className="text-display-xl font-bold text-black/10 select-none mb-4">
            404
          </p>
          <h1 className="text-heading-lg text-black mb-2">Page not found</h1>
          <p className="text-body text-[#4a555e] mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-black text-white text-body-sm font-medium hover:bg-coral hover:text-black transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/tools"
              className="px-5 py-2.5 border-2 border-black text-black text-body-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              Free Tools
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

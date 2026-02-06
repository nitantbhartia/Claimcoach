import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7 text-brand-400" />
              <span className="text-lg font-bold text-white">
                Claim<span className="text-brand-400">Coach</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              AI-powered insurance claim advocacy. Get the settlement you deserve.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/claims/new" className="hover:text-white transition-colors">Start a Claim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Claim Types</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-brand-400">Auto Property Damage</span></li>
              <li><span className="text-gray-600">Homeowner (Coming Soon)</span></li>
              <li><span className="text-gray-600">Health Insurance (Coming Soon)</span></li>
              <li><span className="text-gray-600">Renter&apos;s Insurance (Coming Soon)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">
              &copy; {new Date().getFullYear()} ClaimCoach. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 max-w-md text-center sm:text-right">
              ClaimCoach is an educational tool and does not provide legal advice.
              Consult an attorney for legal guidance specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

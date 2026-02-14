import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ClaimCoach privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-panel">
      <Header />

      <main className="flex-1">
        <div className="container-narrow py-16 sm:py-20">
          <p className="text-caption uppercase tracking-[0.2em] text-black/60 font-medium mb-3">
            Legal
          </p>
          <h1 className="text-display-sm sm:text-display text-black mb-10">
            Privacy Policy
          </h1>

          <div className="prose-container space-y-8 text-body text-[#4a555e] leading-relaxed">
            <p className="text-body-sm text-[#4a555e]/60">
              Last updated: February 14, 2026
            </p>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you use ClaimCoach, we collect information you provide
                directly:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  <strong className="text-black">Account information:</strong>{" "}
                  Name, email address, and password when you create an account.
                </li>
                <li>
                  <strong className="text-black">Claim information:</strong>{" "}
                  Vehicle details, insurance policy documents, settlement offers,
                  damage photos, and other documents you upload for analysis.
                </li>
                <li>
                  <strong className="text-black">Payment information:</strong>{" "}
                  Processed securely by Stripe. We never store your credit card
                  number on our servers.
                </li>
                <li>
                  <strong className="text-black">Usage data:</strong> Pages
                  visited, features used, and interactions with our tools to
                  improve the service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  To analyze your insurance claim and generate personalized
                  recommendations.
                </li>
                <li>
                  To generate counter-offer letters, call scripts, and other
                  claim documents.
                </li>
                <li>To process payments and manage your account.</li>
                <li>
                  To improve our AI models and the accuracy of our analysis.
                  Your data may be used to improve our service, but we never
                  share individual claim details with third parties.
                </li>
                <li>
                  To send you important updates about your claim or account
                  (never marketing spam).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                3. How We Protect Your Information
              </h2>
              <p>
                We take the security of your data seriously. All data is
                encrypted in transit (TLS 1.2+) and at rest. We use Supabase for
                our database with row-level security policies, ensuring you can
                only access your own data. Documents are stored in secure,
                access-controlled cloud storage.
              </p>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                4. Third-Party Services
              </h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>
                  <strong className="text-black">Supabase</strong> —
                  Authentication and database hosting.
                </li>
                <li>
                  <strong className="text-black">Stripe</strong> — Payment
                  processing.
                </li>
                <li>
                  <strong className="text-black">Anthropic (Claude AI)</strong> —
                  AI-powered document analysis. Your documents are sent to
                  Anthropic&apos;s API for processing but are not used to train
                  their models.
                </li>
                <li>
                  <strong className="text-black">Vercel</strong> — Application
                  hosting.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                5. Data Retention
              </h2>
              <p>
                We retain your claim data for as long as your account is active
                or as needed to provide you services. You can request deletion of
                your account and all associated data at any time by contacting
                us.
              </p>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                6. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Export your data in a portable format.</li>
                <li>
                  Opt out of any marketing communications (though we don&apos;t
                  send marketing emails).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                7. Cookies
              </h2>
              <p>
                We use essential cookies for authentication and session
                management. We may use analytics cookies to understand how our
                service is used. We do not use advertising or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                8. Children&apos;s Privacy
              </h2>
              <p>
                ClaimCoach is not intended for use by anyone under the age of 18.
                We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-heading text-black font-semibold mb-3">
                10. Contact Us
              </h2>
              <p>
                If you have questions about this privacy policy or your data,
                contact us at{" "}
                <a
                  href="mailto:privacy@claimcoach.app"
                  className="text-black underline hover:text-coral transition-colors"
                >
                  privacy@claimcoach.app
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

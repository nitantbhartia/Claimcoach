import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Log in to ClaimCoach to access your insurance claim analysis, counter-offers, and negotiation tools.",
  alternates: { canonical: "/login" },
  robots: { index: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

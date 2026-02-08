import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your free ClaimCoach account. Get AI-powered insurance claim analysis, fair value estimates, and professional counter-offer generation.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Sign Up for ClaimCoach",
    description:
      "Create a free account and start fighting back against lowball insurance settlements.",
    url: "https://claimcoach.app/signup",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

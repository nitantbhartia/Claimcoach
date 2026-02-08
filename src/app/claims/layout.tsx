import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim Analysis",
  robots: { index: false },
};

export default function ClaimsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

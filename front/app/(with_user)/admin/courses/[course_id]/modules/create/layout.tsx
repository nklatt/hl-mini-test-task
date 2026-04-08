import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Module" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

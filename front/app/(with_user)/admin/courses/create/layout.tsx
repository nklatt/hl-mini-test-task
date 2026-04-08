import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Course" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

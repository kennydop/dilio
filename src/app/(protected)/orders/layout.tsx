import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oders",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

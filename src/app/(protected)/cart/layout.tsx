import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/shared/components/Header/Header";
import Footer from "@/app/shared/components/Footer";

export const metadata: Metadata = {
  title: "Cart",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/shared/components/Header/Header";
import Footer from "@/app/shared/components/Footer";

export const metadata: Metadata = {
  title: "dilio",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

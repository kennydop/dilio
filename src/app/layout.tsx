import GlassWrapper from "@/app/shared/components/Glass/GlassWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Circles from "@/app/components/Backgrounds/Circles";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <UserProvider>
          {/* <Circles /> */}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

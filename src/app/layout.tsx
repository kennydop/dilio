import GlassWrapper from "@/app/shared/components/Glass/GlassWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/shared/components/Header/Header";
import Circles from "@/app/components/Backgrouds/Circles";

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
        {/* <Circles /> */}
        <div className="background-image">
          <GlassWrapper>
            <Header />
            {children}
          </GlassWrapper>
        </div>
      </body>
    </html>
  );
}

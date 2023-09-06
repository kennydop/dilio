import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/shared/components/Header/Header";
import GlassWrapper from "../shared/components/Glass/GlassWrapper";

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

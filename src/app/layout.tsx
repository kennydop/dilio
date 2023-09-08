import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { UserProvider } from "@/contexts/UserContext";

const font = Raleway({ subsets: ["latin"] });

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
      <body className={font.className}>
        <UserProvider>
          {/* <Circles /> */}
          {children}
        </UserProvider>
      </body>
    </html>
  );
}

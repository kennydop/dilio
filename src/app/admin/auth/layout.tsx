import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Sign in",
  description: "Sign in to or Sign up for your dilio account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}

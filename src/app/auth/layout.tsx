import type { Metadata } from "next";
import GlassWrapper from "../shared/components/Glass/GlassWrapper";

export const metadata: Metadata = {
  title: "Sign in",
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

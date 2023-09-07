import "@/app/globals.css";
import type { Metadata } from "next";
import Header from "@/app/shared/components/Header/Header";
import { toCapitalize } from "@/helpers/strings/strings";
import Footer from "@/app/shared/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return {
    title: params.slug
      .split("_-_")[0]
      .replaceAll("-", " ")
      .replaceAll("and", "&"),
  };
}

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

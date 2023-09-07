import Footer from "@/app/shared/components/Footer";
import Header from "@/app/shared/components/Header/Header";
import { toCapitalize } from "@/helpers/strings/strings";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  return {
    title: toCapitalize(
      params.category.replaceAll("-", " ").replaceAll("and", "&")
    ),
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

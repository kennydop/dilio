import "@/app/globals.css";

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
  return children;
}

import "@/app/globals.css";

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}) {
  return {
    title: params.code,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

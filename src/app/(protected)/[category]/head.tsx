import { useRouter } from "next/router";
export default function Head() {
  const router = useRouter();

  return (
    <>
      <title>{router.query.category}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Location based handyman service finder"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}

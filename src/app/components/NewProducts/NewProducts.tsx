/* eslint-disable @next/next/no-async-client-component */
import { ProductCard } from "@/app/shared/components/Card/ProductCard";
import {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";

export default async function NewProducts() {
  const fetchNewProducts = async () => {
    const q = query(
      collection(db, "products"),
      where("removed", "==", false),
      where("quantity", ">", 0),
      orderBy("quantity", "desc"),
      orderBy("createdAt", "desc"),
      limit(9)
    );
    const querySnapshot = await getDocs(q);
    const products: IProduct[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as IProduct);
    });
    return products;
  };

  const newProducts: IProduct[] = await fetchNewProducts();

  return (
    <div className="flex justify-between flex-col gap-4">
      <h2 className="font-bold text-2xl">New</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {newProducts.map((np, i) => (
          <ProductCard key={i} product={np} />
        ))}
      </div>
    </div>
  );
}

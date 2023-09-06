"use client";
import { ProductCard } from "@/app/shared/components/Card/ProductCard";
import { useEffect, useState } from "react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/config";

function NewProducts() {
  const [newProducts, setNewProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
        limit(9)
      );
      const querySnapshot = await getDocs(q);
      const products: IProduct[] = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as IProduct);
      });
      setNewProducts(products);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between flex-col gap-4">
      <h2 className="font-bold text-2xl">New</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {newProducts.map((category, i) => (
          <ProductCard key={i} product={category} />
        ))}
      </div>
    </div>
  );
}

export default NewProducts;

/* eslint-disable @next/next/no-async-client-component */
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { ProductCard } from "@/app/shared/components/Card/ProductCard";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;
  const fetchProducts = async () => {
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const productsArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IProduct;
    });

    return productsArray;
  };

  const products: IProduct[] = await fetchProducts();

  return (
    <div className="px-11 py-4">
      <div className="flex justify-between flex-col gap-4">
        <h2 className="font-bold text-2xl capitalize">
          {category.replaceAll("-", " ").replaceAll("and", "&")}
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-96">
            <h3 className="text-2xl">No products found for this category</h3>
          </div>
        )}
      </div>
    </div>
  );
}

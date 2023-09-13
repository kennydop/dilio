import { db } from "@/services/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProductsTable from "./(main)/components/ProductsTable";
import { AppButton } from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Products() {
  const [topSellingProducts, setTopSellingProducts] = useState<IProduct[]>([]);
  const [productsOutOfStock, setProductsOutOfStock] = useState<IProduct[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const productsArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IProduct;
    });
    var _productsOutOfStock: IProduct[] = [];
    productsArray.forEach((product) => {
      if (product.quantity == 0) {
        _productsOutOfStock.push(product);
      }
    });
    setProductsOutOfStock(_productsOutOfStock);
    setProducts(productsArray);
  };

  const fetchTopSellingProducts = async () => {
    const q = query(
      collection(db, "products"),
      where("sold", ">", 0),
      orderBy("sold", "desc")
    );

    const querySnapshot = await getDocs(q);
    const productsArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IProduct;
    });
    setTopSellingProducts(productsArray.slice(0, 5));
  };

  const fetchProductsOutOfStock = async () => {
    const q = query(collection(db, "products"));

    const querySnapshot = await getDocs(q);
    const productsArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IProduct;
    });
    var _productsOutOfStock: IProduct[] = [];
    productsArray.forEach((product) => {
      if (product.quantity == 0) {
        _productsOutOfStock.push(product);
      }
    });
    setProductsOutOfStock(_productsOutOfStock);
  };

  const fetchData = async () => {
    setLoading(true);

    setTopSellingProducts([]);
    setProductsOutOfStock([]);
    setProducts([]);

    await fetchTopSellingProducts();
    await fetchProductsOutOfStock();
    await fetchProducts();

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* <h2 className="text-xl font-bold">Overview</h2> */}
      {topSellingProducts && topSellingProducts.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Top Selling</p>
          <ProductsTable
            show={["image", "name", "category", "sold", "added"]}
            canEdit={false}
            canDelete={false}
            products={topSellingProducts}
          />
        </div>
      )}
      {productsOutOfStock && productsOutOfStock.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Out of Stock</p>
          <ProductsTable
            show={["image", "name", "category", "added"]}
            products={productsOutOfStock}
            canDelete={false}
          />
        </div>
      )}
      {products && products.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold">All Products</p>
            <AppButton className="flex gap-2 justify-center items-center">
              <PlusIcon className="h-5 w-5" />
              <span>Add New Product</span>
            </AppButton>
          </div>
          <ProductsTable
            show={[
              "image",
              "name",
              "category",
              "in stock",
              "sold",
              "price",
              "added",
            ]}
            products={products}
          />
        </div>
      )}
    </div>
  );
}

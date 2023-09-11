import React, { useEffect, useState } from "react";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import {
  ArchiveBoxIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { cediFormatter } from "@/helpers/strings/strings";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { IOrder } from "@/contexts/types";
import OutOfStockTable from "./components/OutOfStockTable";

export default function Main() {
  const [orders, setOrders] = useState<IOrder[] | null>();
  const [products, setProducts] = useState<IProduct[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [tRevenue, setTRevenue] = useState(0);
  const [customers, setCustomers] = useState(new Set());
  const [productsOutOfStock, setProductsOutOfStock] = useState<
    IProduct[] | null
  >([]);

  const fetchOrders = async () => {
    const q = query(collection(db, "orders"));

    const querySnapshot = await getDocs(q);
    const ordersArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IOrder;
    });
    setOrders(ordersArray);

    ordersArray.forEach((order) => {
      setTRevenue((prev) => prev + order.total);
      setCustomers((prev) => prev.add(order.userId));
    });
  };

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

  const fetchData = async () => {
    setLoading(true);
    setCustomers(new Set());
    setTRevenue(0);
    await fetchOrders();
    await fetchProducts();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Overview</h2>
      <div className="flex gap-4">
        <DashboardCard
          icon={<PresentationChartBarIcon className="w-5 h-5" />}
          title="Total Revenuex"
          info={cediFormatter.format(tRevenue)}
          color="bg-green-200"
        />
        <DashboardCard
          icon={<UsersIcon className="w-5 h-5" />}
          title="Total Customers"
          info={customers.size.toString()}
          color="bg-blue-200"
        />
        <DashboardCard
          icon={<ShoppingBagIcon className="w-5 h-5" />}
          title="Total Orders"
          info={(orders?.length ?? 0).toString()}
          color="bg-amber-200"
        />
        <DashboardCard
          icon={<ArchiveBoxIcon className="w-5 h-5" />}
          title="Total Products"
          info={(products?.length ?? 0).toString()}
          color="bg-red-200"
        />
      </div>
      {productsOutOfStock && productsOutOfStock.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Out of Stock</p>
          <OutOfStockTable products={productsOutOfStock} />
        </div>
      )}
    </div>
  );
}

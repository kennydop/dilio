import React, { useEffect, useState } from "react";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import {
  ArchiveBoxIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { cediFormatter } from "@/helpers/strings/strings";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { IOrder } from "@/contexts/types";
import OutOfStockTable from "./components/OutOfStockTable";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import { getWeekday } from "@/utils/utils";

interface ISale {
  day: string;
  sales: number;
}

export default function Main() {
  const [orders, setOrders] = useState<IOrder[]>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [tRevenue, setTRevenue] = useState(0);
  const [customers, setCustomers] = useState(new Set());
  const [productsOutOfStock, setProductsOutOfStock] = useState<
    IProduct[] | null
  >([]);
  const [sales, setSales] = useState<ISale[]>([]);

  const generateInitialSales = (): ISale[] => {
    const _sales: ISale[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const weekDay = getWeekday(day);
      _sales.push({ day: weekDay, sales: 0 });
    }
    return _sales.reverse();
  };

  const fetchOrders = async () => {
    const q = query(collection(db, "orders"));

    const querySnapshot = await getDocs(q);
    const ordersArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IOrder;
    });
    setOrders(ordersArray);

    var _sales: ISale[] = [];

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

  const fetchPastWeekSales = async () => {
    const sales = generateInitialSales();
    const q = query(
      collection(db, "orders"),
      where("createdAt", ">", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const ordersArray = querySnapshot.docs.map((doc) => {
      return doc.data() as IOrder;
    });

    ordersArray.forEach((order) => {
      const day = getWeekday(new Date(order.createdAt.seconds * 1000));
      const index = sales.findIndex((sale) => sale.day === day);
      if (index !== -1) {
        sales[index].sales += order.total;
      }
    });

    setSales(sales);
  };

  const fetchData = async () => {
    setLoading(true);
    setCustomers(new Set());
    setTRevenue(0);
    setSales([]);
    await fetchOrders();
    await fetchProducts();
    await fetchPastWeekSales();
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
          title="Total Revenue"
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

      <div className="flex flex-col gap-2">
        <p className="font-bold">Past Week Sales Analytics</p>
        <LineChart width={900} height={200} data={sales}>
          <XAxis dataKey="day" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#0052ff" />
        </LineChart>
      </div>
    </div>
  );
}

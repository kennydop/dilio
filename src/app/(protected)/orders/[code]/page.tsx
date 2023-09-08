"use client";
/* eslint-disable @next/next/no-async-client-component */
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { useEffect, useState } from "react";
import {
  Loading,
  Timeline,
  TimelineConnector,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import CartItem from "../../cart/components/CartItem";
import TimelineHeader from "@material-tailwind/react/components/Timeline/TimelineBody";
import {
  ArchiveBoxIcon,
  BellIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { ActivitiesTimeline } from "./components/ActivitiesTimeline";
import { cediFormatter, formatDate } from "@/helpers/strings/strings";
import { IOrder } from "@/contexts/types";

export default function OrderDetails({ params }: { params: { code: string } }) {
  const code = params.code;
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      const q = query(collection(db, "orders"), where("code", "==", code));

      const querySnapshot = await getDocs(q);
      const _order = querySnapshot.docs[0].data() as IOrder;

      setOrder(_order);
      setLoading(false);
    };

    fetchOrderDetails();
  }, [code]);

  return (
    <div className="px-11 py-4">
      {loading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <Loading className="h-8 w-8" />
        </div>
      ) : order != null || order != undefined ? (
        <div>
          <h2 className="font-bold text-2xl capitalize mb-4">
            {order.code + " "}Details
          </h2>
          <div className="flex gap-6">
            <div className="flex flex-1 flex-col justify-between items-center gap-4">
              {order.items.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
              <ul className="w-full bg-white rounded-xl shadow-md my-8 p-4">
                <li className="flex-1 flex justify-between items-center py-4">
                  <span>Total</span>
                  <span className="text-lg font-bold">
                    {cediFormatter.format(order.total)}
                  </span>
                </li>
                <li className="flex-1 flex justify-between items-center py-4">
                  <span className="font-bold">Deliver To:</span>
                </li>
                <li className="flex-1 flex justify-between items-center py-4">
                  <span>Name</span>
                  <span className="text-lg font-bold">{order.name}</span>
                </li>
                <li className="flex-1 flex justify-between items-center py-4">
                  <span>Phone</span>
                  <span className="text-lg font-bold">{order.phone}</span>
                </li>
                <li className="flex-1 flex justify-between items-center py-4">
                  <span>Address</span>
                  <span className="text-lg font-bold">{order.address}</span>
                </li>
              </ul>
            </div>
            <div className="w-[25rem] sticky top-20 h-fit">
              <ActivitiesTimeline order={order} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h3 className="text-2xl">This order does not exist</h3>
        </div>
      )}
    </div>
  );
}

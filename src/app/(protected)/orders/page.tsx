/* eslint-disable @next/next/no-async-client-component */
"use client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import {
  Card,
  Chip,
  Loading,
  Typography,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import {
  cediFormatter,
  formatDate,
  toCapitalize,
} from "@/helpers/strings/strings";
import Link from "next/link";
import { IOrder } from "@/contexts/types";

const TABLE_HEAD = ["Order Code", "Date", "Total", "Status", "Actions"];

export default function Orders() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const ordersArray = querySnapshot.docs.map((doc) => {
        return doc.data() as IOrder;
      });

      setOrders(ordersArray);
      setLoading(false);
    };

    fetchOrders();
  }, [user.uid]);

  return (
    <div className="px-11 py-4">
      {loading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <Loading className="h-8 w-8" />
        </div>
      ) : (
        <div className="flex justify-between flex-col gap-5">
          <h2 className="font-bold text-2xl capitalize">All Orders</h2>
          {orders == null || orders.length > 0 ? (
            <Card className="h-full w-full mb-40">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(({ code, createdAt, total, status }, index) => {
                    const isLast = index === orders.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={code}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {code}
                          </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatDate(createdAt)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {cediFormatter.format(total)}
                          </Typography>
                        </td>
                        <td className={`${classes} bg-blue-gray-50/50`}>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={status}
                                color={
                                  status === "delivered"
                                    ? "blue"
                                    : status === "pending"
                                    ? "gray"
                                    : status === "processing"
                                    ? "amber"
                                    : status === "in-transit"
                                    ? "green"
                                    : "red"
                                }
                              />
                            </div>
                          </td>
                        </td>
                        <td className={`${classes}`}>
                          <Link href={`/orders/${code}`}>
                            <Typography
                              variant="small"
                              className="font-medium text-primary"
                            >
                              SEE DETAILS
                            </Typography>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          ) : (
            <div className="flex justify-center items-center h-96">
              <h3 className="text-2xl">Your orders will appear here</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

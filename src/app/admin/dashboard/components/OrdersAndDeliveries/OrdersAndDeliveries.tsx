import { IOrder } from "@/contexts/types";
import { db } from "@/services/firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import OrdersTable from "../Tables/OrdersTable";

export default function OrdersAndDeliveries() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pendingOrders, setPendingOrders] = useState<IOrder[]>([]);
  const [processingOrders, setProcessingOrders] = useState<IOrder[]>([]);
  const [inTransitOrders, setInTransitOrders] = useState<IOrder[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<IOrder[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    var _pendingOrders: IOrder[] = [];
    var _processingOrders: IOrder[] = [];
    var _inTransitOrders: IOrder[] = [];
    var _cancelledOrders: IOrder[] = [];
    var _deliveredOrders: IOrder[] = [];

    const querySnapshot = await getDocs(q);
    const ordersArray = querySnapshot.docs.map((doc) => {
      if (doc.data().status == "pending") {
        _pendingOrders.push(doc.data() as IOrder);
      }
      if (doc.data().status == "processing") {
        _processingOrders.push(doc.data() as IOrder);
      }
      if (doc.data().status == "in-transit") {
        _inTransitOrders.push(doc.data() as IOrder);
      }
      if (doc.data().status == "cancelled") {
        _cancelledOrders.push(doc.data() as IOrder);
      }
      if (doc.data().status == "delivered") {
        _deliveredOrders.push(doc.data() as IOrder);
      }
      return doc.data() as IOrder;
    });
    setPendingOrders(_pendingOrders);
    setProcessingOrders(_processingOrders);
    setInTransitOrders(_inTransitOrders);
    setCancelledOrders(_cancelledOrders);
    setDeliveredOrders(_deliveredOrders);
    setOrders(ordersArray);
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchOrders();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {pendingOrders && pendingOrders.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Pending</p>
          <OrdersTable orders={pendingOrders} refresh={fetchData} />
        </div>
      )}
      {processingOrders && processingOrders.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Processing</p>
          <OrdersTable orders={processingOrders} refresh={fetchData} />
        </div>
      )}
      {inTransitOrders && inTransitOrders.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">In Transit</p>
          <OrdersTable orders={inTransitOrders} refresh={fetchData} />
        </div>
      )}
      {deliveredOrders && deliveredOrders.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Delivered</p>
          <OrdersTable
            orders={deliveredOrders}
            refresh={fetchData}
            canView={false}
          />
        </div>
      )}
      {cancelledOrders && cancelledOrders.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">Cancelled</p>
          <OrdersTable orders={cancelledOrders} refresh={fetchData} />
        </div>
      )}
      {orders && orders.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-bold">All</p>
          <OrdersTable orders={orders} refresh={fetchData} />
        </div>
      )}
    </div>
  );
}

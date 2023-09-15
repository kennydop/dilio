import FormInput from "@/app/shared/components/Inputs/FormInput";
import {
  AppButton,
  Loading,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { ICartItem, IOrder } from "@/contexts/types";
import { cediFormatter, formatDate } from "@/helpers/strings/strings";
import { db } from "@/services/firebase/config";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
} from "@material-tailwind/react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ViewEditOrderDialog({
  btn,
  refresh,
  defOrder,
}: {
  btn: JSX.Element;
  refresh: () => void;
  defOrder: IOrder;
}) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(defOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(
        collection(db, "products"),
        where(
          "id",
          "in",
          order?.items!.map((item: ICartItem) => item.id)
        )
      );

      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map((doc) => {
        return doc.data() as IProduct;
      });

      setProducts(productsArray);
    };

    fetchProducts();
  }, [order]);

  const updateOrder = async () => {
    if (!order.status) setError("Please select a status");
    if (order.status == defOrder.status) return handleOpen();
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, "orders"),
        where("code", "==", order.code)
      );

      const querySnapshot = await getDocs(q);

      const docRef = doc(db, "orders", querySnapshot.docs[0].id);

      var _d: any = {
        status: order.status,
        updatedAt: new Date(),
      };

      if (order.status == "delivered") {
        _d["deliveredDate"] = new Date();
        if (!order.inTransitDate) _d["inTransitDate"] = new Date();
        if (!order.processingDate) _d["processingDate"] = new Date();
      }
      if (order.status == "cancelled") {
        _d["cancelledDate"] = new Date();
      }
      if (order.status == "in-transit") {
        _d["inTransitDate"] = new Date();
        if (!order.processingDate) _d["processingDate"] = new Date();
      }
      if (order.status == "processing") {
        _d["processingDate"] = new Date();
      }
      await updateDoc(docRef, _d);
      refresh();
      handleOpen();
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {btn ? (
        <div onClick={handleOpen}>{btn}</div>
      ) : (
        <AppButton
          className="flex gap-2 justify-center items-center"
          onClick={handleOpen}
        >
          <EyeIcon className="h-5 w-5" />
          <span>View</span>
        </AppButton>
      )}
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader className="flex flex-col text-start w-full items-start">
          <h2>{loading ? "Editing Order..." : "View Order Details"}</h2>
          {error && <p className="error">{error}</p>}
        </DialogHeader>
        <DialogBody
          divider
          className="flex flex-col gap-2 h-[25rem] overflow-auto"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex gap-2 justify-between items-center">
                <span>Order Code:</span>
                <span className=" font-bold">{order.code}</span>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <span>Order Date:</span>
                <span className=" font-bold">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <span>Deliver To:</span>
                <span className=" font-bold">{order.name}</span>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <span>Phone:</span>
                <span className=" font-bold">{order.phone}</span>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <span>Address:</span>
                <span className=" font-bold">{order.address}</span>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <span>Total:</span>
                <span className=" font-bold">
                  {cediFormatter.format(order.total)}
                </span>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <span>Status:</span>
                <FormInput
                  placeholder="Status"
                  type="select"
                  value={order.status}
                  options={[
                    "pending",
                    "processing",
                    "in-transit",
                    "cancelled",
                    "delivered",
                  ]}
                  onChange={(e) => setOrder({ ...order, status: e })}
                />
              </div>
              <p className="font-bold">Products:</p>
              <div className="flex flex-col gap-2">
                {order.items?.map((item: ICartItem, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-14 h-14 relative rounded-lg overflow-hidden">
                        <Image
                          alt="Product Image"
                          src={
                            products?.find((i) => i.id == item.id)?.images[0]!
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="">
                        {products?.find((i) => i.id == item.id)?.name}
                      </p>
                    </div>
                    <p className=" text-primary">
                      x{order.items![index].quantity}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter>
          {!loading && (
            <>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <AppButton onClick={updateOrder}>Edit Order </AppButton>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}

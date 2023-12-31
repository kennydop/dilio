"use client";

import {
  AppButton,
  Loading,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { useUser } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import CartItem from "./components/CartItem";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { cediFormatter } from "@/helpers/strings/strings";
import { PaystackButton } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";
import Link from "next/link";
import Image from "next/image";
import { ICartItem, IOrder } from "@/contexts/types";
import SelectAddressDialog from "./components/SelectAddressDialog";

export default function Cart() {
  const { user, userDoc, updateCart, placeOrder } = useUser();
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [checkoutSeccess, setCheckoutSeccess] = useState(false);

  const totalAmount: number =
    userDoc?.cart?.reduce(
      (acc: number, item: ICartItem) =>
        acc +
        products?.find((i) => i.id == item.id)?.price! *
          (userDoc?.cart!.find((i: ICartItem) => i.id == item.id)?.quantity ||
            1) +
        (products?.find((i) => i.id == item.id)?.shipping || 0),
      0
    ) || 0;

  const config: PaystackProps = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: Math.ceil(totalAmount * 100),
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY!,
  };

  const handlePaystackSuccessAction = async (reference: any) => {
    const newOrder: IOrder = {
      code: `ORD${reference.reference}`,
      reference: reference.reference,
      userId: user!.uid,
      name: name,
      phone: phone,
      address: address,
      items: userDoc!.cart!,
      status: "pending",
      total: totalAmount,
      paid: true,
      createdAt: new Timestamp(new Date().getTime() / 1000, 0),
      updatedAt: new Timestamp(new Date().getTime() / 1000, 0),
    };
    await placeOrder(newOrder);
    await updateCart([]);
    setCheckoutSeccess(true);
    setLoading(false);
  };

  const handlePaystackCloseAction = () => {
    setLoading(false);
  };

  const componentProps = {
    ...config,
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  useEffect(() => {
    if (userDoc) {
      setLoading(false);
    }
  }, [userDoc]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (userDoc && userDoc!.cart!.length < 1) return;
      const q = query(
        collection(db, "products"),
        where(
          "id",
          "in",
          userDoc?.cart!.map((item: ICartItem) => item.id)
        )
      );

      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map((doc) => {
        return doc.data() as IProduct;
      });

      setProducts(productsArray);
    };

    fetchProducts();
  }, [userDoc]);

  return (
    <div className="px-11 py-4 flex gap-4">
      {checkoutSeccess ? (
        <div className="flex flex-col justify-center items-center py-24 w-full">
          <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-xl shadow-md">
            <Image
              alt="Success"
              src="/assets/images/success.gif"
              width={200}
              height={200}
            />
            <h3 className="text-2xl text-center">
              Your order has been placed successfully
            </h3>
            <Link href="/orders" className="text-primary w-full">
              <AppButton fullWidth={true}>View Orders</AppButton>
            </Link>
          </div>
        </div>
      ) : loading || userDoc == null ? (
        <div className="flex justify-center items-center h-96 w-full">
          <Loading className="h-8 w-8" />
        </div>
      ) : userDoc?.cart!.length == 0 ? (
        <div className="flex justify-center items-center h-96 w-full">
          <h3 className="text-2xl text-center">Your cart is empty</h3>
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col gap-6">
            {userDoc?.cart!.map((item: ICartItem) => (
              <CartItem
                key={item.id}
                edit={true}
                item={item}
                product={products?.find((i) => i.id == item.id)!}
              />
            ))}
            <div className="h-10"></div>
          </div>
          <div className="w-64 md:w-72 lg:w-80 xl:w-96">
            <div className="bg-white rounded-xl shadow-md w-full p-4 flex flex-col gap-2 sticky left-0 right-0 top-20">
              <h2 className="text-xl font-bold">Order Summary</h2>
              {userDoc?.cart == null || userDoc?.cart == undefined ? (
                <div className="h-4 w-48 bg-gray-300 animate-pulse rounded-md"></div>
              ) : (
                userDoc?.cart?.map((item: ICartItem, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="">
                      {products?.find((i) => i.id == item.id)?.name}
                    </p>
                    <p className=" text-primary">
                      x{userDoc?.cart![index].quantity}
                    </p>
                  </div>
                ))
              )}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Total</h3>
                {products == null || undefined ? (
                  <div className="h-6 w-32 bg-gray-300 animate-pulse rounded-md"></div>
                ) : (
                  <p className="text-lg font-bold text-primary">
                    {cediFormatter.format(totalAmount)}
                  </p>
                )}
              </div>
              <AppButton
                loading={clearing}
                disabled={products == null || undefined}
                onClick={async () => {
                  setClearing(true);
                  await updateCart([]);
                  setClearing(false);
                }}
                className="bg-gray-300 text-gray-600 mt-2"
              >
                Clear Cart
              </AppButton>
              <SelectAddressDialog
                setName={setName}
                setPhone={setPhone}
                setAddress={setAddress}
                PayButton={
                  <PaystackButton {...componentProps} className="">
                    <AppButton
                      disabled={products == null || undefined}
                      onClick={() => {
                        setLoading(true);
                      }}
                      className="bg-primary text-white mt-2"
                    >
                      Proceed To Make Payment
                    </AppButton>
                  </PaystackButton>
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

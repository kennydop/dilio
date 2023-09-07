"use client";

import AppCarousel from "@/app/shared/components/Carousel/AppCarousel";
import {
  AppButton,
  Loading,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { useUser } from "@/contexts/UserContext";
import { toCapitalize } from "@/helpers/strings/strings";
import { db } from "@/services/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const docId = params.slug.split("_-_")[1];

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const docRef = doc(db, "products", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data() as IProduct);
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [docId]);

  const { user, userDoc, updateCart } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  return (
    <div className="px-11 py-4">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Loading className="h-8 w-8" />
        </div>
      ) : product == null || product == undefined ? (
        <div className="flex justify-center items-center h-96">
          <h3 className="text-2xl">Item not found</h3>
        </div>
      ) : (
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <AppCarousel
              height="h-[28rem]"
              className="rounded-xl"
              images={product?.images || []}
            />
            <div className="bg-white rounded-xl shadow-md w-full p-4 mb-6">
              <h1 className="text-xl font-bold">Description</h1>
              <p className="text-sm text-gray-500">{product?.description}</p>
            </div>
          </div>
          <div className="w-64 md:w-72 lg:w-80 xl:w-96">
            <div className="bg-white rounded-xl shadow-md w-full p-4 flex flex-col gap-2 sticky left-0 right-0 top-20">
              <h1 className="text-3xl font-bold">{product?.name}</h1>
              <span className="text-gray-500">
                {toCapitalize(
                  product?.category.replaceAll("_", " ").replaceAll("and", "&")
                )}
              </span>
              <p className="text-xl font-bold text-primary">
                GH₵{product?.price}
              </p>
              <AppButton
                loading={adding}
                fullWidth={true}
                className={`hover:scale-105 focus:scale-105 focus:shadow-none active:scale-100 mt-2 ${
                  userDoc?.cart?.find((item) => item == product.id)
                    ? "bg-gray-300 text-gray-600"
                    : "bg-primary text-white"
                }`}
                onClick={async (e) => {
                  e.stopPropagation();

                  if (!user) return router.push("/auth");
                  setAdding(true);

                  var newCart = userDoc?.cart ?? [];

                  if (newCart.find((item) => item === product.id)) {
                    newCart = newCart.filter((item) => item !== product.id);
                  } else {
                    newCart.push(product.id);
                  }

                  await updateCart(newCart);
                  setAdding(false);
                }}
              >
                {userDoc?.cart?.find((item) => item == product.id)
                  ? "Added "
                  : "Add "}
                to Cart
              </AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

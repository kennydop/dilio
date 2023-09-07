import {
  AppIconButton,
  Typography,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { useUser } from "@/contexts/UserContext";
import { cediFormatter, toCapitalize } from "@/helpers/strings/strings";
import { db } from "@/services/firebase/config";
import { MinusSmallIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartItem({
  item,
  product,
}: {
  item: ICartItem;
  product: IProduct;
}) {
  const { user, userDoc, updateCart } = useUser();
  const [loading, setLoading] = useState(false);
  const [updatingQuantity, setUpdatingQuantity] = useState(false);
  const [removing, setRemoving] = useState(false);
  // const [product, setProduct] = useState<IProduct | null>(null);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     setLoading(true);
  //     const docRef = doc(db, "products", item.id);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setProduct(docSnap.data() as IProduct);
  //     } else {
  //       setProduct(null);
  //     }
  //     setLoading(false);
  //   };

  //   fetchProduct();
  // }, [item]);

  return (
    <div className="bg-white rounded-xl shadow-md flex gap-4 h-64 w-full p-3 relative">
      <div className="w-1/2 relative">
        {product && (
          <Image
            src={product.images[0]}
            alt="product image"
            className="h-full w-full object-cover rounded-xl"
            fill
          />
        )}
      </div>
      <div className="flex flex-col justify-between w-full">
        {product && (
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{product?.name}</p>
            <AppIconButton
              loading={removing}
              variant="outlined"
              color="red"
              onClick={async () => {
                const newCart =
                  userDoc?.cart?.filter((i) => i.id !== item.id) || [];
                await updateCart(newCart);
              }}
              size="sm"
            >
              <XMarkIcon className="h-5 w-5" />
            </AppIconButton>
          </div>
        )}
        {product && (
          <span className="text-gray-500">
            {toCapitalize(
              product!.category.replaceAll("-", " ").replaceAll("and", "&")
            )}
          </span>
        )}

        {product && <p className="">{cediFormatter.format(product?.price)}</p>}
        {product && (
          <p className="text-sm text-gray-500">
            Shipping: {cediFormatter.format(product?.shipping)}
          </p>
        )}
        {product && (
          <div className="flex gap-2 items-center">
            <AppIconButton
              loading={updatingQuantity}
              disabled={item.quantity <= 1}
              size="sm"
              onClick={async () => {
                setUpdatingQuantity(true);
                const newCart =
                  userDoc?.cart?.map((i) => {
                    if (i.id === item.id && i.quantity > 1) {
                      return { ...i, quantity: i.quantity - 1 };
                    }
                    return i;
                  }) || [];
                await updateCart(newCart);
                setUpdatingQuantity(false);
              }}
            >
              <MinusSmallIcon className="h-5 w-5" />
            </AppIconButton>

            <p className="text-gray-500 px-2 text-center">
              {updatingQuantity ? "..." : item.quantity}
            </p>

            <AppIconButton
              loading={updatingQuantity}
              disabled={item.quantity >= product!.quantity}
              size="sm"
              onClick={async () => {
                setUpdatingQuantity(true);
                const newCart =
                  userDoc?.cart?.map((i) => {
                    if (i.id === item.id) {
                      return { ...i, quantity: i.quantity + 1 };
                    }
                    return i;
                  }) || [];
                await updateCart(newCart);
                setUpdatingQuantity(false);
              }}
            >
              <PlusIcon className="h-5 w-5" />
            </AppIconButton>
          </div>
        )}
        <div className="text-right">
          {product && (
            <p className="text-primary font-bold">
              Sub Total: {cediFormatter.format(product!.price * item.quantity)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

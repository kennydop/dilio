"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { AppButton } from "../MaterialTailwind/MaterialTailwind";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { cediFormatter } from "@/helpers/strings/strings";
import { ICartItem } from "@/contexts/types";

export function ProductCard({ product }: { product: IProduct }) {
  const [loading, setLoading] = useState(false);
  const { user, userDoc, updateCart } = useUser();
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(
          `/p/${product.name.replaceAll("&", "and").replaceAll(" ", "-")}_-_${
            product.id
          }`
        );
      }}
    >
      <CardHeader shadow={false} floated={false} className="h-72 relative">
        <Image
          src={product.images[0]}
          alt="product image"
          className="h-full w-full object-cover"
          fill
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography
            color="blue-gray"
            className="font-medium whitespace-nowrap overflow-hidden overflow-ellipsis flex-1"
            title={product.name}
          >
            {product.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            {cediFormatter.format(product.price)}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 line-clamp-2"
        >
          {product.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <AppButton
          loading={loading}
          fullWidth={true}
          className={`${
            userDoc?.cart?.find((item: ICartItem) => item.id == product.id)
              ? "bg-gray-300 text-gray-600"
              : "bg-primary text-white"
          }`}
          onClick={async (e) => {
            e.stopPropagation();

            if (!user) return router.push("/auth");
            setLoading(true);

            var newCart = userDoc?.cart ?? [];

            if (newCart.find((item: ICartItem) => item.id === product.id)) {
              newCart = newCart.filter(
                (item: ICartItem) => item.id !== product.id
              );
            } else {
              newCart.push({
                id: product.id,
                quantity: 1,
              });
            }

            await updateCart(newCart);
            setLoading(false);
          }}
        >
          {userDoc?.cart?.find((item: ICartItem) => item.id == product.id)
            ? "Added "
            : "Add "}
          to Cart
        </AppButton>
      </CardFooter>
    </Card>
  );
}

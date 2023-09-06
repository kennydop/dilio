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

export function ProductCard({ product }: { product: IProduct }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [numberAddedToCart, setNumberAddedToCart] = useState(0);

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="">
        <CardHeader shadow={false} floated={false} className="h-72 relative">
          <Image
            src={product.images[0]}
            alt="card-image"
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
              GH₵{product.price}
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
            fullWidth={true}
            className="hover:scale-105 focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </AppButton>
        </CardFooter>
      </Card>
    </Link>
  );
}

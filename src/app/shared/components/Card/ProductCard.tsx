"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { AppButton } from "../MaterialTailwind/MaterialTailwind";
import { useState } from "react";

export function ProductCard({ product }: { product: IProduct }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [numberAddedToCart, setNumberAddedToCart] = useState(0);

  return (
    <Card className="">
      <CardHeader shadow={false} floated={false} className="h-72">
        <Image
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
          fill
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            GH₵{product.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
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
  );
}

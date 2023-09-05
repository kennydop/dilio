import { ProductCard } from "@/app/shared/components/Card/ProductCard";
import React from "react";

function Trending() {
  const trending: IProduct[] = [
    {
      id: "1",
      name: "Nike Air Max 270",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "2",
      name: "Nike Air Max 270",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "3",
      name: "Nike Air Max 270",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "4",
      name: "Nike Air Max 270",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
  ];
  return (
    <div className="flex justify-between flex-col gap-4">
      <h2 className="font-bold text-2xl">Trending</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {trending.map((category, i) => (
          <ProductCard key={i} product={category} />
        ))}
      </div>
    </div>
  );
}

export default Trending;

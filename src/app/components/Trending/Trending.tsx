import { ProductCard } from "@/app/shared/components/Card/ProductCard";
import React from "react";

function Trending() {
  const trending: IProduct[] = [
    {
      id: "1",
      name: "Nike Air Max 270",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "2",
      name: "Red Apple",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1570598383310-fc553b759221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1846&q=80",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "3",
      name: "Silver iPhone X with Silver iPad",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1516163173352-d1c4d006f9ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "4",
      name: "Apple magic mouse and magic keyboard",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1510674485131-dc88d96369b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1898&q=80",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "5",
      name: "White Airtag",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1619948543232-c515a389c22d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "6",
      name: "black iPad",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. If you find my photos useful, please consider subscribing to me on YouTube for the occasional",
      quantity: 76,

      // createdAt: Date.parse("2021-06-01T12:00:00.000Z"),
      // updatedAt: Date.parse("2021-06-01T12:00:00.000Z"),
    },
    {
      id: "7",
      name: "Airpods Pro",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
      ],
      category: "shoes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. If you find my photos useful, please consider subscribing to me on YouTube for the occasional",
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

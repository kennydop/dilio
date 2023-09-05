import Image from "next/image";
import React from "react";

function CategoryCard({ category }: { category: ICategory }) {
  return (
    // <div
    //   key={i}
    //   className="flex flex-col gap-2 justify-center items-center h-32 glass rounded-md shadow-md cursor-pointer transition-all hover:shadow-xl"
    // >
    <div className="flex flex-col gap-2 justify-center items-center h-32 cursor-pointer hover:glass rounded-xl">
      <Image alt={category.name} src={category.icon} width={50} height={50} />
      <span className="text-center">{category.name}</span>
    </div>
  );
}

export default CategoryCard;

import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryCard({ category }: { category: ICategory }) {
  return (
    <Link
      href={`/${category.name
        .replaceAll("&", "and")
        .replaceAll(" ", "-")
        .toLowerCase()}`}
    >
      <div className="flex flex-col gap-2 justify-center items-center h-32 cursor-pointer hover:glass rounded-xl">
        <Image alt={category.name} src={category.icon} width={50} height={50} />
        <span className="text-center">{category.name}</span>
      </div>
    </Link>
  );
}

export default CategoryCard;

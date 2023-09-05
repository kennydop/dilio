import Image from "next/image";
import React from "react";
import CategoryCard from "./CategoryCard";

interface CategoryProps {
  name: string;
  icon: string;
}

function Categories() {
  const categories: ICategory[] = [
    {
      id: "1",
      name: "Mobile Phones",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fsmartphone.png?alt=media&token=51f0be99-0986-4200-a438-fc2e46d1ba47",
    },
    {
      id: "1",
      name: "Smart Watches & Trackers",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fsmart-watch.png?alt=media&token=b4a8faa9-a5c5-4e8f-8e4c-af1e4e61227c",
    },
    {
      id: "1",
      name: "Tablets",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fipad.png?alt=media&token=0a7b89f9-ada8-4770-befe-50fa4c82a8e3",
    },
    {
      id: "1",
      name: "Laptops",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Flaptop.png?alt=media&token=0575e7a3-c4a1-4665-a4cb-a93d59543ac2",
    },
    {
      id: "1",
      name: "Desktops",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fcomputer.png?alt=media&token=3e6e5016-94f5-4d86-9891-218df33cf0a1",
    },
    {
      id: "1",
      name: "Gaming Consoles",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fgame-console.png?alt=media&token=fc4d6a7d-6489-4f6d-b6f7-60f16389e38e",
    },
    {
      id: "1",
      name: "Audio",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fspeaker.png?alt=media&token=e307883e-247d-484d-a44c-570f2589f9bf",
    },
    {
      id: "1",
      name: "Cameras",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fcamera.png?alt=media&token=57bd0d2e-fe74-43d7-bf4c-163bb027caaf",
    },
    {
      id: "1",
      name: "Printers & Scanners",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fprinter.png?alt=media&token=df90da7b-ec94-4cd6-b7be-81c9703de149",
    },
    {
      id: "1",
      name: "Software",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Flayers.png?alt=media&token=d0dea640-8f3f-4ea1-974d-36bf3990811e",
    },
    {
      id: "1",
      name: "TVs",
      icon: "https://firebasestorage.googleapis.com/v0/b/dilio-36346.appspot.com/o/icons%2Fsmart-tv.png?alt=media&token=d709c121-b14a-4bcb-aeb6-83d2d57f76bc",
    },
  ];

  return (
    <div className="flex justify-between flex-col gap-4">
      <h2 className="font-bold text-2xl">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories;

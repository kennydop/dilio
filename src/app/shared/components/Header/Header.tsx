"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppButton,
  Input,
  AppIconButton,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import SearchBar from "@/app/shared/components/SearchBar/SearchBar";

export default function Header() {
  const [dynamicStyles, setDynamicStyles] = useState({});
  const [dynamicPadding, setDynamicPadding] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop: number = window.scrollY;

      const maxShadow: number = 10;
      const maxBorderRadius: number = 12;
      const maxPaddingX: number = 42;
      const maxPaddingY: number = 8;

      // Calculate new values based on scroll position
      const newShadow: number = Math.min(scrollTop / 15, maxShadow);
      const newBorderRadius: number = Math.min(scrollTop / 8, maxBorderRadius);
      const newPaddingX: number = Math.min(scrollTop / 3, maxPaddingX);
      const newPaddingY: number = Math.min(scrollTop / 22, maxPaddingY);

      setDynamicStyles({
        boxShadow: `0px ${newShadow / 5}px ${newShadow}px rgba(0, 0, 0, 0.1)`,
        borderRadius: `${newBorderRadius}px`,
      });

      setDynamicPadding({
        paddingLeft: `${newPaddingX}px`,
        paddingRight: `${newPaddingX}px`,
        paddingTop: `${newPaddingY}px`,
        paddingBottom: `${newPaddingY}px`,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={dynamicPadding} className="sticky top-0 left-0 right-0 z-50">
      <div
        style={dynamicStyles}
        className="flex justify-between items-center glass-bg w-full h-full p-3"
      >
        <Link href="/">
          <h2 className="font-bold text-3xl text-primary cursor-pointer">
            dilio.
          </h2>
        </Link>
        <div className="relative flex w-full gap-2 md:w-max">
          <SearchBar />
        </div>
        <AppButton>Sign In</AppButton>
      </div>
    </div>
  );
}

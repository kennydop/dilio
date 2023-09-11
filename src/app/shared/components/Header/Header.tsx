"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppButton,
  Input,
  AppIconButton,
  Typography,
  Avatar,
  Badge,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import SearchBar from "@/app/shared/components/SearchBar/SearchBar";
import { useUser } from "@/contexts/UserContext";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import HeaderCategories from "./components/HeaderCategories";
import AvatarMenu from "./components/AvatarMenu";

export default function Header() {
  const [dynamicStyles, setDynamicStyles] = useState({});
  const [dynamicPadding, setDynamicPadding] = useState({});
  const { user, userDoc } = useUser();
  const router = useRouter();

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
        className="flex justify-between items-center glass-bg w-full h-full py-3 px-5"
      >
        <div className="flex gap-8 justify-center items-center">
          <Link href="/">
            <h2 className="font-bold text-3xl text-primary cursor-pointer">
              dilio.
            </h2>
          </Link>
          <div>
            <HeaderCategories />
          </div>
          <Link
            href="/admin/dashboard"
            className="font-bold uppercase text-xs text-gray-800"
          >
            Dashboard
          </Link>
        </div>
        <div className="relative w-full gap-2 md:w-max hidden lg:flex">
          <SearchBar />
        </div>
        {user ? (
          <div className="flex items-center gap-6">
            <Badge
              content={userDoc?.cart?.length}
              className="bg-primary"
              invisible={(userDoc?.cart?.length ?? 0) < 1}
            >
              <AppIconButton
                size="sm"
                variant="outlined"
                className="text-primary border-primary"
                onClick={() => {
                  if (user) {
                    router.push("/cart");
                  } else {
                    router.push("/auth");
                  }
                }}
              >
                <ShoppingBagIcon className="h-4 w-4" />
              </AppIconButton>
            </Badge>
            <AvatarMenu />
          </div>
        ) : (
          <Link href="/auth">
            <AppButton>Sign In</AppButton>
          </Link>
        )}
      </div>
    </div>
  );
}

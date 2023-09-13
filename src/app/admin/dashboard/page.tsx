"use client";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import SideNav from "./components/SideNav/SideNav";
import Main from "./components/(main)/Main";
import Products from "./components/Products";

export default function Dashboard() {
  const { user, userDoc } = useUser();
  const [active, setActive] = useState(0);

  return userDoc?.admin == true ? (
    <div className="flex">
      <SideNav active={active} setActive={setActive} />
      <div className="flex flex-col flex-1 h-screen p-4 overflow-auto">
        {active == 0 ? <Main /> : active == 1 ? <Products /> : null}
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      Not authorized
    </div>
  );
}

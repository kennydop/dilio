"use client";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import SideNav from "./components/SideNav/SideNav";
import Main from "./components/(main)/Main";
import Products from "./components/Products/Products";
import OrdersAndDeliveries from "./components/OrdersAndDeliveries/OrdersAndDeliveries";

interface IComponents {
  [key: number]: JSX.Element;
}

const components: IComponents = {
  0: <Main />,
  1: <Products />,
  2: <OrdersAndDeliveries />,
};

export default function Dashboard() {
  const { user, userDoc } = useUser();
  const [active, setActive] = useState(0);

  return userDoc?.admin == true ? (
    <div className="flex">
      <SideNav active={active} setActive={setActive} />
      <div className="flex flex-col flex-1 h-screen p-4 overflow-auto">
        {components[active]}
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      Not authorized
    </div>
  );
}

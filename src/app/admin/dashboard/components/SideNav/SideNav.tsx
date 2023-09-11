import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import {
  PresentationChartBarIcon,
  PowerIcon,
  WalletIcon,
  ArchiveBoxIcon,
  QueueListIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export default function SideNav({
  active,
  setActive,
}: {
  active: number;
  setActive: Function;
}) {
  return (
    <Card className="h-screen w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
      <div className="mb-2 p-4">
        <Link href="">
          <h2 className="font-bold text-3xl text-primary cursor-pointer">
            dilio.
          </h2>
        </Link>
      </div>
      <List>
        <ListItem
          className={active == 0 ? "bg-primary text-white" : ""}
          onClick={(e) => {
            setActive(0);
          }}
        >
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>

        <ListItem
          className={active == 1 ? "bg-primary text-white" : ""}
          onClick={(e) => {
            setActive(1);
          }}
        >
          <ListItemPrefix>
            <WalletIcon className="h-5 w-5" />
          </ListItemPrefix>
          Summaries
        </ListItem>

        <ListItem
          className={active == 2 ? "bg-primary text-white" : ""}
          onClick={(e) => {
            setActive(2);
          }}
        >
          <ListItemPrefix>
            <ArchiveBoxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Products
        </ListItem>

        <ListItem
          className={active == 3 ? "bg-primary text-white" : ""}
          onClick={(e) => {
            setActive(3);
          }}
        >
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Orders &amp; Deliveries
        </ListItem>

        <ListItem className="text-red-500">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

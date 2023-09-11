import React from "react";
import DashboardCard from "./components/DashboardCard/DashboardCard";
import {
  ArchiveBoxIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { cediFormatter } from "@/helpers/strings/strings";

export default function Main() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <div className="flex gap-4">
        <DashboardCard
          icon={<PresentationChartBarIcon className="w-5 h-5" />}
          title="Total Revenue"
          info={cediFormatter.format(9687)}
          color="bg-green-200"
        />
        <DashboardCard
          icon={<UsersIcon className="w-5 h-5" />}
          title="Total Customers"
          info={"111"}
          color="bg-blue-200"
        />
        <DashboardCard
          icon={<ShoppingBagIcon className="w-5 h-5" />}
          title="Total Orders"
          info={"111"}
          color="bg-amber-200"
        />
        <DashboardCard
          icon={<ArchiveBoxIcon className="w-5 h-5" />}
          title="Total Products"
          info={"111"}
          color="bg-red-200"
        />
      </div>
    </div>
  );
}

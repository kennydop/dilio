import { Card } from "@material-tailwind/react";
import { ReactNode } from "react";

export default function DashboardCard({
  icon,
  title,
  info,
  color,
}: {
  icon: ReactNode;
  title: string;
  info: string;
  color: string;
}) {
  return (
    <Card className="hover:shadow-lg cursor-default">
      <div className="flex gap-4 p-4 w-[14.2rem]">
        <div
          className={`p-4 rounded-full ${color}  ${
            color && "text-white"
          } text-center`}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h2 className="text-xs font-bold text-gray-500 uppercase">{title}</h2>
          <p
            className="text-xl whitespace-nowrap overflow-hidden overflow-ellipsis w-32"
            title={info}
          >
            {info}
          </p>
        </div>
      </div>
    </Card>
  );
}

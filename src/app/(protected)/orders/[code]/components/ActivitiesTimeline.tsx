import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  ArrowPathIcon,
  TruckIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { formatDate } from "@/helpers/strings/strings";
import { IOrder } from "@/contexts/types";

export function ActivitiesTimeline({ order }: { order: IOrder }) {
  return (
    <Timeline>
      {["delivered"].includes(order.status) && (
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost" color="blue">
              <CheckCircleIcon className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Delivered
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {formatDate(order.deliveredDate!)}
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
      )}

      {["in-transit", "delivered"].includes(order.status) && (
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost" color="green">
              <TruckIcon className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                In Transit
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {formatDate(order.inTransitDate!)}
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
      )}

      {["processing", "in-transit", "delivered"].includes(order.status) && (
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost" color="amber">
              <ArrowPathIcon className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Order Being Prepared
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {formatDate(order.processingDate!)}
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
      )}

      <TimelineItem className="h-28">
        <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
          <TimelineIcon className="p-3" variant="ghost">
            <ShoppingBagIcon className="h-5 w-5" />
          </TimelineIcon>
          <div className="flex flex-col gap-1">
            <Typography variant="h6" color="blue-gray">
              Oder Accepted
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {formatDate(order.createdAt)}
            </Typography>
          </div>
        </TimelineHeader>
      </TimelineItem>
    </Timeline>
  );
}

import { AppIconButton } from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { IOrder } from "@/contexts/types";
import { cediFormatter, formatDate } from "@/helpers/strings/strings";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Card, Chip, Typography } from "@material-tailwind/react";
import EditOrderDialog from "../EditOrderDialog/EditOrderDialog";

const TABLE_HEAD = [
  "Address",
  "Order Code",
  "Date",
  "Total",
  "Status",
  "Actions",
];

export default function OrdersTable({
  orders,
  refresh,
}: {
  orders: IOrder[];
  refresh: () => void;
}) {
  return (
    <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const isLast = index === orders.length - 1;
            const _address: string = `${order.name}, ${order.phone}, ${order.address}`;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={order.code}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {_address.length > 35
                      ? _address.substring(0, 35) + "..."
                      : _address}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {order.code}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {formatDate(order.createdAt)}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {cediFormatter.format(order.total)}
                  </Typography>
                </td>
                <td className={classes}>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={order.status}
                        color={
                          order.status === "delivered"
                            ? "blue"
                            : order.status === "pending"
                            ? "gray"
                            : order.status === "processing"
                            ? "amber"
                            : order.status === "in-transit"
                            ? "green"
                            : "red"
                        }
                      />
                    </div>
                  </td>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <EditOrderDialog
                    btn={
                      <AppIconButton
                        size="sm"
                        variant="text"
                        className="text-primary"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </AppIconButton>
                    }
                    defOrder={order}
                    refresh={refresh}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

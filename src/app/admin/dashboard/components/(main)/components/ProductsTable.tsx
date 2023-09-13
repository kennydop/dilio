import {
  AppButton,
  AppIconButton,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { formatDate, toCapitalize } from "@/helpers/strings/strings";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function ProductsTable({
  products,
  show,
  canEdit = true,
  canDelete = true,
}: {
  products: IProduct[];
  show: string[];
  canEdit?: boolean;
  canDelete?: boolean;
}) {
  var _th = show;
  _th = _th.map((head) => toCapitalize(head));
  if (canEdit || canDelete) _th.push("Actions");
  const TABLE_HEAD = _th;

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
          {products.map(
            (
              {
                id,
                images,
                name,
                category,
                quantity,
                sold,
                price,
                shipping,
                createdAt,
              },
              index
            ) => {
              const isLast = index === products.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  {show.includes("image") && (
                    <td className={classes}>
                      <div className="relative w-8 h-8 rounded-md overflow-hidden">
                        <Image
                          alt="product image"
                          src={images[0]}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </td>
                  )}
                  {show.includes("name") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name.substring(0, 30) +
                          (name.length > 30 ? "..." : "")}
                      </Typography>
                    </td>
                  )}
                  {show.includes("category") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal capitalize"
                      >
                        {category
                          .replaceAll("-", " ")
                          .replaceAll("and", "&")
                          .substring(0, 20) +
                          (category.length > 20 ? "..." : "")}
                      </Typography>
                    </td>
                  )}
                  {show.includes("in stock") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {quantity}
                      </Typography>
                    </td>
                  )}
                  {show.includes("sold") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {sold ?? 0}
                      </Typography>
                    </td>
                  )}
                  {show.includes("price") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price}
                      </Typography>
                    </td>
                  )}
                  {show.includes("shipping") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {shipping}
                      </Typography>
                    </td>
                  )}
                  {show.includes("added") && (
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(createdAt)}
                      </Typography>
                    </td>
                  )}
                  {TABLE_HEAD.includes("Actions") && (
                    <td className={`${classes} flex`}>
                      {canEdit && (
                        <AppIconButton
                          size="sm"
                          variant="text"
                          className="text-primary"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </AppIconButton>
                      )}
                      {canDelete && (
                        <>
                          {canEdit && (
                            <div className="mx-2 border-l border-gray-400"></div>
                          )}
                          <AppIconButton
                            size="sm"
                            variant="text"
                            className="text-red-500"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </AppIconButton>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
}

import { Avatar } from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { IUserDoc } from "@/contexts/types";

export default function RecentCustomers({
  customers,
}: {
  customers: IUserDoc[];
}) {
  return (
    <div className="flex items-center -space-x-3">
      {customers
        .reverse()
        .slice(0, 4)
        .map((customer, index) => (
          <Avatar
            key={index}
            variant="circular"
            size="sm"
            src={customer.photoURL}
            alt={customer.displayName}
            className="border-2 border-white hover:z-10 focus:z-10"
          />
        ))}

      {customers.length - 4 > 0 && (
        <div className="bg-gray-100 text-gray-500 flex items-center justify-center relative object-cover object-center !rounded-full w-9 h-9 border-2 border-white hover:z-10 focus:z-10">
          <span className="text-xs font-bold">+{customers.length - 4}</span>
        </div>
      )}
    </div>
  );
}

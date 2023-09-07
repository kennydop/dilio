import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Typography,
  Avatar,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { useUser } from "@/contexts/UserContext";
import { ArrowLeftOnRectangleIcon, TruckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function AvatarMenu() {
  const { user, logOut } = useUser();
  return (
    <Menu>
      <MenuHandler>
        <div className="flex items-center gap-3 cursor-pointer">
          <Typography variant="h6">
            {
              user.displayName?.split(" ")[
                user.displayName?.split(" ").length - 1
              ]
            }
          </Typography>
          <Avatar size="sm" src={user.photoURL!} alt="avatar" />
        </div>
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <TruckIcon className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            My Orders
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem
          className="flex items-center gap-2"
          onClick={() => {
            logOut();
          }}
        >
          <ArrowLeftOnRectangleIcon className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

import { db } from "@/services/firebase/config";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@/app/shared/components/MaterialTailwind/MaterialTailwind";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesArray = querySnapshot.docs.map((doc) => {
        return doc.data() as ICategory;
      });
      setCategories(categoriesArray);
    };

    fetchCategories();
  }, []);

  return (
    <Menu>
      <MenuHandler>
        <Button size="sm" variant="text" className="text-gray-800 focus:ring-0">
          Categories
        </Button>
      </MenuHandler>
      <MenuList className="max-h-[28rem]">
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onClick={() => {
              router.push(
                `/${category.name
                  .replaceAll("&", "and")
                  .replaceAll(" ", "-")
                  .toLowerCase()}`
              );
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

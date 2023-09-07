import CategoryCard from "./CategoryCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/config";

export default async function Categories() {
  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categoriesArray = querySnapshot.docs.map((doc) => {
      return doc.data() as ICategory;
    });
    return categoriesArray;
  };

  const categories: ICategory[] = await fetchCategories();

  return (
    <div className="flex justify-between flex-col gap-4">
      <h2 className="font-bold text-2xl">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categories.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </div>
    </div>
  );
}

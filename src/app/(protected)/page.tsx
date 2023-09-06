import AppCarousel from "@/app/shared/components/Carousel/AppCarousel";
import Categories from "../components/Categories/Categories";
import Trending from "../components/Trending/Trending";

export default function Home() {
  return (
    <div>
      <AppCarousel
        images={[
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1478432780021-b8d273730d8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        ]}
      />
      <div className="px-11 py-4">
        <Categories />
      </div>
      <div className="px-11 py-4">
        <Trending />
      </div>
    </div>
  );
}

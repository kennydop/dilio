import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AppIconButton } from "@/app/shared/components/MaterialTailwind/MaterialTailwind";

const SearchBar: React.FC = () => {
  return (
    <div className="flex relative border border-gray-400 rounded-lg min-w-[248px] justify-between items-center p-1">
      <input
        type="text"
        placeholder="Search anything..."
        className="border w-full outline-none border-none focus:ring-0 bg-transparent"
      />
      <div>
        <AppIconButton size="sm">
          <MagnifyingGlassIcon />
        </AppIconButton>
      </div>
    </div>
  );
};

export default SearchBar;

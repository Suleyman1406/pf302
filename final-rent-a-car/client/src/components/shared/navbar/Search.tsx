import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/constants/paths";

let timeoutId: NodeJS.Timeout;
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isListingPage = location.pathname.includes("list");

  function handleSearch(searchText: string) {
    clearTimeout(timeoutId);
    if (!searchText) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    timeoutId = setTimeout(() => {
      searchParams.set("search", searchText);
      setSearchParams(searchParams);
      if (!isListingPage) navigate(paths.LIST + `?${searchParams.toString()}`);
    }, 300);
  }

  return (
    <div className="relative hidden md:block lg:w-[320px] xl:w-[492px]">
      <img
        src={SearchIcon}
        alt="search icon"
        className="absolute left-5 top-2.5"
      />
      <input
        onChange={(e) => handleSearch(e.target.value.trim())}
        placeholder="Search something here"
        className="w-full border border-[#c3d4e966] rounded-[70px] py-[11px] pl-12 lg:pl-16 pr-11 placeholder:text-secondary text-sm font-medium leading-[20px] tracking-[-0.28px]"
      />
      <img
        src={FilterIcon}
        alt="filter icon"
        className="absolute right-5 top-2.5"
      />
    </div>
  );
};

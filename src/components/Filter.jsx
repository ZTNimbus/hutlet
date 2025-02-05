"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(key) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", key);
    router.replace(`${path}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={"border border-primary-800 flex"}>
      <FilterButton
        handleFilter={handleFilter}
        filter={"all"}
        activeFilter={activeFilter}
      >
        All Huts
      </FilterButton>
      <FilterButton
        handleFilter={handleFilter}
        filter={"small"}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </FilterButton>
      <FilterButton
        handleFilter={handleFilter}
        filter={"medium"}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </FilterButton>
      <FilterButton
        handleFilter={handleFilter}
        filter={"large"}
        activeFilter={activeFilter}
      >
        8 and above guests
      </FilterButton>
    </div>
  );
}

export default Filter;

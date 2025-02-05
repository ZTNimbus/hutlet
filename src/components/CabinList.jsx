import { getCabins } from "@/lib/data-service";
import CabinCard from "./CabinCard";

const SMALL_CAPACITY = 3;
const LARGE_CAPACITY = 8;

async function CabinList({ filter }) {
  const cabins = await getCabins();

  let displayedCabins = cabins;

  if (filter === "all") displayedCabins = cabins;

  if (filter === "small")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity <= SMALL_CAPACITY
    );

  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) =>
        cabin.maxCapacity > SMALL_CAPACITY && cabin.maxCapacity < LARGE_CAPACITY
    );

  if (filter === "large")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= LARGE_CAPACITY
    );

  if (!displayedCabins?.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;

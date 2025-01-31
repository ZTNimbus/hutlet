import Spinner from "@/components/Spinner";

function Loading() {
  return (
    <div className={"grid justify-center items-center"}>
      <Spinner />
      <p className={"text-xl text-primary-200"}>Loading hut data...</p>
    </div>
  );
}

export default Loading;

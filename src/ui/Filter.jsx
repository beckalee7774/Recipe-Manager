import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <span className="mr-2">Filter by</span>
      <select
        value={searchParams.get("filter") ? searchParams.get("filter") : "none"}
        onChange={(e) => {
          searchParams.set("filter", e.target.value);
          setSearchParams(searchParams);
        }}
        className="mb-2 bg-orange-100 dark:bg-orange-700"
      >
        <option value="none">none</option>
        <option value="favourite">favourite</option>
        <option value="shared">shared</option>
      </select>
    </div>
  );
}

export default Filter;

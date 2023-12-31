import { useSearchParams } from "react-router-dom";

function Sortby() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <span className="mr-2">Sort by</span>
      <select
        value={searchParams.get("sortby") ? searchParams.get("sortby") : "none"}
        onChange={(e) => {
          searchParams.set("sortby", e.target.value);
          setSearchParams(searchParams);
        }}
        className="mb-2 bg-orange-100 dark:bg-orange-700"
      >
        <option value="none">none</option>
        <option value="recent">recent</option>
        <option value="stars">stars</option>
      </select>
    </div>
  );
}

export default Sortby;

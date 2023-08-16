import Search from "../features/search/Search";
import Heading from "../ui/Heading";

function SearchRecipes() {
  return (
    <>
      <Heading title="Search for new Recipes" emoji="🌮" />
      <Search />
    </>
  );
}

export default SearchRecipes;

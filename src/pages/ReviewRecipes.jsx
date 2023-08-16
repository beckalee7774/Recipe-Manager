import ReviewList from "../features/review/ReviewList";
import Heading from "../ui/Heading";

function ReviewRecipes() {
  return (
    <>
      <Heading title="Reviewed Recipes" emoji="🥘" />
      <ReviewList />
    </>
  );
}

export default ReviewRecipes;

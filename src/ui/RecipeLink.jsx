function RecipeLink({ sourceUrl, sourceName, size }) {
  const sizeString = size === "xxs" ? "text-[0.5rem]" : "text-xs";
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noreferrer"
      className={sizeString.concat(
        " font-semibold rounded-full dark:text-orange-200 text-orange-600 hover:text-orange-400"
      )}
    >
      Link on {sourceName} &rarr;
    </a>
  );
}

export default RecipeLink;

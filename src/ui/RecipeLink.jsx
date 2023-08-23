function RecipeLink({ sourceUrl, sourceName, size }) {
  const sizeString = size === "xxs" ? "text-[0.5rem]" : "text-xs";
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noreferrer"
      className={sizeString.concat(
        " font-semibold hover:text-orange-400 dark:hover:text-orange-400 dark:text-orange-100 text-orange-600"
      )}
    >
      Link on {sourceName} &rarr;
    </a>
  );
}

export default RecipeLink;

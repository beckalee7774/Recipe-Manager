function Heading({ title, emoji }) {
  return (
    <h1 className="text-center font-semibold pt-1 rounded-md mb-3 text-orange-800 dark:text-orange-100">
      {title}! {emoji}
    </h1>
  );
}

export default Heading;

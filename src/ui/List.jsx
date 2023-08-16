function List({ title, list, render }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul className="list-disc px-2 mt-2 text-xs marker:text-orange-400">
        {list.map(render)}
      </ul>
    </div>
  );
}

export default List;

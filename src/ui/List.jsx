function List({ title, list, render, listStyle = "list-disc" }) {
  return (
    <div>
      <h2 className="text-center">{title}</h2>
      <ul className={`${listStyle} mt-2 text-xs marker:text-orange-400`}>
        {list.map(render)}
      </ul>
    </div>
  );
}

export default List;

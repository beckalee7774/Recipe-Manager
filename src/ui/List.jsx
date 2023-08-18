function List({ title, list, render, listStyle = "list-disc" }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul className={`${listStyle} px-2 mt-2 text-xs marker:text-orange-400`}>
        {list.map(render)}
      </ul>
    </div>
  );
}

export default List;

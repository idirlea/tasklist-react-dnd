import ListItem from "./ListItem";

function List({ items, moveItemHandler }) {
  return (
    <div className="panel">
      <h2>Tasks</h2>
      <ul className="list">
        {items.filter(item => item.status !== 'done').map((item, index) => (
          <ListItem key={item.id} index={index} item={item} moveItemHandler={moveItemHandler} />
        ))}
      </ul>
    </div>
  );
}

export default List;

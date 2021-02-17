import { useState } from "react";
import List from "./List";
import Workspace from "./Workspace";

function Board() {
  const [itemsList, setItemsList] = useState([
    { id: 1, title: "Creating a new design", status: "in-progress", sort: 1 },
    { id: 2, title: "Learn to use React DND", status: "in-progress", sort: 2 },
    { id: 3, title: "Implement an example", status: "to-do", sort: 3 },
  ]);

  const moveItemHandler = (dragIndex, hoverIndex) => {
    const dragItem = itemsList[dragIndex];

    if (dragItem) {
      const newItems = [...itemsList];
      const prevItem = newItems.splice(hoverIndex, 1, dragItem);

      newItems.splice(dragIndex, 1, prevItem[0]).map((item, index) => {
        item.sort = index + 1;
        return item;
      });

      setItemsList(newItems);
    }
  };

  const onDrop = (droppedItem) => {
    setItemsList(itemsList.map(item => {
        if (item.id === droppedItem.id) {
            item.status = 'done'
        }
        
        return item;
    }))
  }

  return (
    <div className="board">
      <List items={itemsList} moveItemHandler={moveItemHandler} />
      <Workspace items={itemsList} onDrop={onDrop} />
    </div>
  );
}

export default Board;

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { TASK } from "./itemTypes";

function ListItem({ item, moveItemHandler, index }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: TASK, index, ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => ({ type: TASK, ...item }),
    end: (item, monitor) => {
      console.log(monitor.getDropResult());
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: [TASK],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItemHandler(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref}>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
        className="list-item"
      >
        {item.title} {isOver}
      </div>
    </div>
  );
}

export default ListItem;

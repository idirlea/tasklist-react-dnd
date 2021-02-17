import { useDrop } from "react-dnd";
import { TASK } from "./itemTypes";

function Workspace({ items, onDrop }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [TASK],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className="workspace">
      {items
        .filter((item) => item.status === "done")
        .map((item) => (
          <div className="item">
            <h2>{item.title}</h2>
          </div>
        ))}
    </div>
  );
}

export default Workspace;

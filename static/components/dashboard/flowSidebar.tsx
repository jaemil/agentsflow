import React from "react";
import CustomNode from "./customNode";

const nodeTypes = {
  custom: CustomNode,
};

const FlowSidebar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-48 border-r">
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className=""
        onDragStart={(event) => onDragStart(event, "customInput")}
        draggable
      >
        Input Node
      </div>
      <div
        className=""
        onDragStart={(event) => onDragStart(event, "customdefault")}
        draggable
      >
        Default Node
      </div>
      <div
        className=""
        onDragStart={(event) => onDragStart(event, "customOutput")}
        draggable
      >
        Output Node
      </div>
    </div>
  );
};

export default FlowSidebar;

import React from "react";
import { UserProxyAgentNodeMemo } from "./customNode";

const FlowSidebar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-48 p-4 space-y-2 border-r">
      <p>Agents</p>
      {/* <div
        className="h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        onDragStart={(event) => onDragStart(event, "cutomInput")}
        draggable
      >
        User Proxy
        <UserProxyAgentNodeMemo
          type={"inputNode"}
          data={{
            name: "",
          }}
        />
      </div>
      <div onDragStart={(event) => onDragStart(event, "cutomInput")} draggable>
        AssistantAgentNode
      </div> */}
      <div
        onDragStart={(event) => onDragStart(event, "customDefault")}
        draggable
      >
        Default Node
      </div>
      <div onDragStart={(event) => onDragStart(event, "customInput")} draggable>
        Input Node
      </div>
      <div
        onDragStart={(event) => onDragStart(event, "customOutput")}
        draggable
      >
        Output Node
      </div>
    </div>
  );
};

export default FlowSidebar;

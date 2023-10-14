import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@agentsflow/ui-components';
import AgentForm from './agent-form';

const FlowSidebar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [openAddAgent, setOpenAddAgent] = useState(false);

  return (
    <div className="min-w-[192px] max-w-[192px] p-4 space-y-2 border-r w-48">
      <div className="flex items-center justify-between">
        <span>Agents</span>

        <Dialog open={openAddAgent} onOpenChange={setOpenAddAgent}>
          <DialogTrigger>
            <div className="flex items-center justify-start w-full h-10 gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
              Add
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 15 15"
              >
                <g transform="translate(1756 -582) rotate(90)">
                  <line
                    x1="10"
                    transform="translate(589.5 1753.5) rotate(-90)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                  <line
                    id="Linie_1226"
                    data-name="Linie 1226"
                    y1="10"
                    transform="translate(584.5 1748.5) rotate(-90)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Agent</DialogTitle>
            </DialogHeader>
            <AgentForm closePopup={() => setOpenAddAgent(false)} />
          </DialogContent>
        </Dialog>
      </div>
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
        onDragStart={(event) => onDragStart(event, 'customDefault')}
        draggable
      >
        Default Node
      </div>
      <div onDragStart={(event) => onDragStart(event, 'customInput')} draggable>
        Input Node
      </div>
      <div
        onDragStart={(event) => onDragStart(event, 'customOutput')}
        draggable
      >
        Output Node
      </div>
    </div>
  );
};

export default FlowSidebar;

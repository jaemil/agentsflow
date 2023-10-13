"use client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import FlowSidebar from "./flow-sidebar";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { InputNodeMemo, OutputNodeMemo, DefaultNodeMemo } from "./custom-node";
import useStore from "@/lib/store";

export const nodeTypes = {
  customInput: InputNodeMemo,
  customOutput: OutputNodeMemo,
  customDefault: DefaultNodeMemo,
};

// const initNodes = [
//   {
//     id: "1",
//     type: "customInput",
//     data: { name: "Coder", isRunning: false },
//     position: { x: 0, y: 50 },
//   },
//   {
//     id: "2",
//     type: "customDefault",
//     data: { name: "Designer", isRunning: false },
//     position: { x: -200, y: 200 },
//   },
// ];

const initNodes = [
  {
    id: "1",
    type: "customInput",
    data: { label: "Node 0" },
    position: { x: 250, y: 5 },
    className: "light",
  },
  {
    id: "2",
    data: { label: "Group A" },
    position: { x: 100, y: 100 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 200 },
  },
  {
    id: "2a",
    data: { label: "Node A.1" },
    position: { x: 10, y: 50 },
    parentNode: "2",
  },
  {
    id: "3",
    data: { label: "Node 1" },
    position: { x: 320, y: 100 },
    className: "light",
  },
  {
    id: "4",
    data: { label: "Group B" },
    position: { x: 320, y: 200 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 300, height: 300 },
  },
  {
    id: "4a",
    data: { label: "Node B.1" },
    position: { x: 15, y: 65 },
    className: "light",
    parentNode: "4",
    extent: "parent",
  },
  {
    id: "4b",
    data: { label: "Group B.A" },
    position: { x: 15, y: 120 },
    className: "light",
    style: {
      backgroundColor: "rgba(255, 0, 255, 0.2)",
      height: 150,
      width: 270,
    },
    parentNode: "4",
  },
  {
    id: "4b1",
    data: { label: "Node B.A.1" },
    position: { x: 20, y: 40 },
    className: "light",
    parentNode: "4b",
  },
  {
    id: "4b2",
    data: { label: "Node B.A.2" },
    position: { x: 100, y: 100 },
    className: "light",
    parentNode: "4b",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2a-4a", source: "2a", target: "4a" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e3-4b", source: "3", target: "4b" },
  { id: "e4a-4b1", source: "4a", target: "4b1" },
  { id: "e4a-4b2", source: "4a", target: "4b2" },
  { id: "e4b1-4b2", source: "4b1", target: "4b2" },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const setOpenChat = useStore((state) => state.setOpenChat);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();

      const reactFlowBounds =
        reactFlowWrapper.current!.getBoundingClientRect() as any;
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, name: "Designer", isRunning: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClick = (event: any, node: any) => {
    setOpenChat(true);
    console.log("click node", node);
  };

  useEffect(() => {
    console.log("nodes", nodes, "edges", edges);
  }, [nodes, edges]);

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <div className="flex w-full h-full">
          <FlowSidebar />
          <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
            >
              <Controls />
              <Background color="#444" variant={BackgroundVariant.Dots} />
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow;

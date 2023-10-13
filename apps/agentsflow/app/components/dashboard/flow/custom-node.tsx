import React, { memo } from "react";
import { Handle, Position } from "reactflow";

type CustomNodeProps = {
  type: string;
  data: {
    name: string;
  };
};

function DefaultNode({ data, type }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 border rounded-md shadow-md bg-card">
      <div className="flex">
        <div className="text-lg font-bold">{data.name}</div>
      </div>

      {type}

      <Handle type="target" position={Position.Top} className="w-16" />
      <Handle type="source" position={Position.Bottom} className="w-16" />
    </div>
  );
}

function InputNode({ data, type }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 border rounded-md shadow-md bg-card">
      <div className="flex">
        <div className="text-lg font-bold">{data.name}</div>
      </div>

      {type}

      <Handle type="source" position={Position.Bottom} className="w-16" />
    </div>
  );
}

function OutputNode({ data, type }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 border rounded-md shadow-md bg-card">
      <div className="flex">
        <div className="text-lg font-bold">{data.name}</div>
      </div>

      {type}

      <Handle type="target" position={Position.Top} className="w-16" />
    </div>
  );
}

function AssistantAgentNode({ data, type }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 border rounded-md shadow-md bg-card">
      <div className="flex">
        <div className="text-lg font-bold">{data.name}</div>
      </div>

      {type}

      <Handle type="target" position={Position.Top} className="w-16" />
    </div>
  );
}

function UserProxyAgentNode({ data, type }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 border rounded-md shadow-md bg-card">
      <div className="flex">
        <div className="text-lg font-bold">{data.name}</div>
      </div>

      {type}

      <Handle type="target" position={Position.Top} className="w-16" />
    </div>
  );
}

const DefaultNodeMemo = memo(DefaultNode);
const InputNodeMemo = memo(InputNode);
const OutputNodeMemo = memo(OutputNode);
const UserProxyAgentNodeMemo = memo(UserProxyAgentNode);
const AssistantAgentNodeNodeMemo = memo(AssistantAgentNode);

export {
  DefaultNodeMemo,
  InputNodeMemo,
  OutputNodeMemo,
  UserProxyAgentNodeMemo,
  AssistantAgentNodeNodeMemo,
};

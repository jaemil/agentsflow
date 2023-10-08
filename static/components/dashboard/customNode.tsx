import React, { memo } from "react";
import { Handle, Position } from "reactflow";

type CustomNodeProps = {
  data: {
    emoji: string;
    name: string;
    job: string;
  };
};

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 border rounded-md shadow-md bg-card">
      <div className="flex">
        <div className="text-lg font-bold">{data.name}</div>
        <div className="text-gray-500">{data.job}</div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16" />
      <Handle type="source" position={Position.Bottom} className="w-16" />
    </div>
  );
}

export default memo(CustomNode);

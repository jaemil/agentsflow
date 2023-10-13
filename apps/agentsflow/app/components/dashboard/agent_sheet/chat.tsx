"use client";
import * as React from "react";
import { Send } from "lucide-react";
import { Button, Textarea, cn } from "@agentsflow/ui-components";
import useStore from "../../../lib/store";

const ChatInput = ({
  runAgent,
}: {
  startAgent: ({
    agent_name,
    message,
  }: {
    agent_name: string;
    message: string;
  }) => void;
  runAgent: ({
    agent_name,
    message,
  }: {
    agent_name: string;
    message: string;
  }) => void;
}) => {
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  const addMessage = useStore((state) => state.addMessage);
  const selectedAgent = useStore((state) => state.selectedAgent);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputLength === 0) return;
        addMessage({ message: input, role: "user" }, selectedAgent);
        runAgent({
          message: input,
          agent_name: "assistant",
        });
        setInput("");
      }}
      className="flex items-center w-full space-x-2"
    >
      <Textarea
        id="message"
        placeholder="Type your message..."
        className="flex-1"
        autoComplete="off"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <Button type="submit" size="icon" disabled={inputLength === 0}>
        <Send className="w-4 h-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};
const Chat = ({
  startAgent,
  runAgent,
}: {
  startAgent: ({
    agent_name,
    message,
  }: {
    agent_name: string;
    message: string;
  }) => void;
  runAgent: ({
    agent_name,
    message,
  }: {
    agent_name: string;
    message: string;
  }) => void;
}) => {
  const selectedAgent = useStore((state) => state.selectedAgent);
  const agents = useStore((state) => state.agents);

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll">
      {agents[selectedAgent].messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
            message.role === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          {message.message}
        </div>
      ))}
    </div>
  );
};

export { Chat, ChatInput };

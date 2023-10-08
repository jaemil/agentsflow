"use client";
import Chat from "@/components/dashboard/chat";
import Flow from "@/components/dashboard/flow/flow";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import SideBar from "@/components/dashboard/sideBar";
import useStore from "@/lib/store";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const openChat = useStore((state) => state.openChat);
  const addMessage = useStore((state) => state.addMessage);
  const ws = useRef<any>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8999/ws");

    ws.current.onopen = () => {
      console.log("ws opened");
    };

    ws.current.onclose = () => {
      console.log("ws closed");
    };

    ws.current.onmessage = (event: { data: any }) => {
      console.log(event.data);

      // TODO: add message to agent index not 0
      addMessage({ message: JSON.parse(event.data).message, role: "agent" }, 0);
    };

    console.log("test");

    return () => {
      ws.current.close();
    };
  }, []);

  const startAgent = ({
    agent_name,
    message,
  }: {
    agent_name: string;
    message: string;
  }) => {
    ws.current.send(
      JSON.stringify({
        action: "start_agent",
        agent_name: agent_name,
        message: message,
      })
    );
  };

  const runAgent = ({
    agent_name,
    message,
  }: {
    agent_name: string;
    message: string;
  }) => {
    ws.current.send(
      JSON.stringify({
        action: "send_message",
        agent_name: agent_name,
        message: message,
      })
    );
  };

  return (
    <main className="grid w-screen h-screen grid-cols-[0fr_1fr] grid-rows-[0fr_1fr] gap-0">
      <div className="flex flex-col col-span-4">
        <Navigation />
      </div>
      <div className="col-span-1 col-start-1 row-start-2">
        <SideBar />
      </div>
      <div className="col-span-3 col-start-2 row-start-2">
        <Flow />
      </div>
      <div
        className={cn(
          "transition-all absolute top-0 right-0 w-full h-screen pt-28 max-w-3xl",
          {
            "translate-x-0 w-full": openChat,
            "translate-x-full": !openChat,
          }
        )}
      >
        <Chat startAgent={startAgent} runAgent={runAgent} />
      </div>
    </main>
  );
}

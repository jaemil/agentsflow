"use client";
import * as React from "react";
import { Check, Plus, Send } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import useStore from "../../../lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Chat, ChatInput } from "./chat";

export default function Sheet({
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
}) {
  const setOpenChat = useStore((state) => state.setOpenChat);
  const setSelectedAgent = useStore((state) => state.setSelectedAgent);
  const selectedAgent = useStore((state) => state.selectedAgent);
  const agents = useStore((state) => state.agents);

  return (
    <Tabs
      defaultValue="chat"
      className="flex flex-col justify-between w-full h-full rounded-b-none rounded-tr-none"
    >
      <Card className="flex flex-col justify-between w-full h-full rounded-b-none rounded-tr-none">
        <div className="flex flex-col overflow-hidden">
          <CardHeader className="flex pb-0">
            <div className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <Avatar className="p-1 rounded-none">
                  <AvatarImage src="/images/agent.svg" alt="Image" />
                  {/* <AvatarFallback>AG</AvatarFallback> */}
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    Agent {agents[selectedAgent].agentId}
                  </p>
                  {/* <p className="text-sm text-muted-foreground">m@example.com</p> */}
                </div>
              </div>
              <span
                onClick={() => setOpenChat(false)}
                className="cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>

            <TabsList className="justify-start w-full bg-transparent border-b rounded-none">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pb-0 overflow-scroll">
            <TabsContent value={"chat"}>
              <Chat startAgent={startAgent} runAgent={runAgent} />
            </TabsContent>

            <TabsContent value={"settings"} className="flex flex-col gap-2">
              <div className="flex flex-row items-center space-x-2">
                {agents.map((agent, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setSelectedAgent(index);
                    }}
                  >
                    Agent {agent.agentId}
                  </Button>
                ))}

                <div>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      startAgent({
                        agent_name: "assistant",
                        message: "what is your purpose",
                      });
                    }}
                  >
                    Start Agent
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </div>
        <CardFooter className="shadow-2xl">
          <TabsContent className="w-full mt-0" value={"chat"}>
            <ChatInput startAgent={startAgent} runAgent={runAgent} />
          </TabsContent>
        </CardFooter>
      </Card>
    </Tabs>
  );
}

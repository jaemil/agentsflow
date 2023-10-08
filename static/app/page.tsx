"use client";
import { useState } from "react";
import Chat from "@/components/dashboard/chat";
import Flow from "@/components/dashboard/flow";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import SideBar from "@/components/dashboard/sideBar";
import useStore from "@/lib/store";

export default function Home() {
  const openChat = useStore((state) => state.openChat);

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
        <Chat />
      </div>
    </main>
  );
}

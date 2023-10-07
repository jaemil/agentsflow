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

export default function Home() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <main className="grid w-screen h-screen grid-cols-[repeat(2, 1fr)] grid-rows-[0fr_1fr] gap-0">
      <div className="flex flex-col col-span-3">
        <Navigation />
        <Button className="w-fit" onClick={() => setOpenChat((prev) => !prev)}>
          Open
        </Button>
      </div>
      <div className="col-span-3 row-start-2">
        <Flow />
      </div>
      <div
        className={cn(
          "transition-all absolute top-0 right-0 w-full h-screen pt-28 max-w-3xl",
          {
            "translate-x-0 w-full": !openChat,
            "translate-x-full w-0": openChat,
          }
        )}
      >
        <Chat />
      </div>
    </main>
  );
}

"use client";
import React from "react";
import { Button } from "../ui/button";
import useStore from "@/lib/store";

export default function SideBar() {
  const setOpenChat = useStore((state) => state.setOpenChat);
  return (
    <div className="w-48 h-full border-r">
      <div className="py-2 space-y-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              onClick={() => setOpenChat(false)}
              variant="secondary"
              className="justify-start w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                className="w-4 h-4 mr-2"
              >
                <path
                  id="Icon_metro-flow-branch"
                  data-name="Icon metro-flow-branch"
                  d="M19.552,6.153A2.143,2.143,0,1,0,16.5,8.088c-.073,1.414-1.134,1.895-2.978,2.586a11.655,11.655,0,0,0-2.365,1.1V8.1a2.143,2.143,0,1,0-1.786,0v6.829a2.143,2.143,0,1,0,1.8.007c.073-1.413,1.135-1.895,2.978-2.586,1.812-.68,4.054-1.528,4.143-4.246a2.141,2.141,0,0,0,1.258-1.947ZM10.266,4.917A1.237,1.237,0,1,1,9.031,6.153a1.236,1.236,0,0,1,1.236-1.237Zm0,13.187A1.237,1.237,0,1,1,11.5,16.867,1.237,1.237,0,0,1,10.266,18.1ZM17.409,7.39a1.237,1.237,0,1,1,1.236-1.237A1.237,1.237,0,0,1,17.409,7.39Z"
                  transform="translate(-6.338 -4.01)"
                  fill="currentColor"
                />
              </svg>
              Flow
            </Button>
            <Button
              onClick={() => setOpenChat(true)}
              variant="ghost"
              className="justify-start w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                className="w-4 h-4 mr-2"
              >
                <path
                  id="Icon_awesome-robot"
                  data-name="Icon awesome-robot"
                  d="M0,6V9a.749.749,0,0,0,.75.75H1.5V5.25H.75A.749.749,0,0,0,0,6ZM10.875,2.25H8.25V.75a.75.75,0,1,0-1.5,0v1.5H4.125A1.874,1.874,0,0,0,2.25,4.125V10.5A1.5,1.5,0,0,0,3.75,12h7.5a1.5,1.5,0,0,0,1.5-1.5V4.125A1.874,1.874,0,0,0,10.875,2.25ZM6,9.75H4.5V9H6ZM5.25,6.938A.938.938,0,1,1,6.187,6,.937.937,0,0,1,5.25,6.938Zm3,2.813H6.75V9h1.5Zm2.25,0H9V9h1.5ZM9.75,6.938A.938.938,0,1,1,10.688,6,.937.937,0,0,1,9.75,6.938Zm4.5-1.688H13.5v4.5h.75A.749.749,0,0,0,15,9V6A.749.749,0,0,0,14.25,5.25Z"
                  transform="translate(0 1.5)"
                  fill="currentColor"
                />
              </svg>
              Agents
            </Button>
            <Button variant="ghost" className="justify-start w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                className="w-4 h-4 mr-2"
              >
                <path
                  id="Icon_material-folder"
                  data-name="Icon material-folder"
                  d="M9,6H4.5A1.5,1.5,0,0,0,3.008,7.5L3,16.5A1.5,1.5,0,0,0,4.5,18h12A1.5,1.5,0,0,0,18,16.5V9a1.5,1.5,0,0,0-1.5-1.5h-6Z"
                  transform="translate(-3 -4)"
                  fill="currentColor"
                />
              </svg>
              Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

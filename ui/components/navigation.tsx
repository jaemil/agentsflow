import React from "react";
import { ThemeSwitcher } from "./ui/themeSwitcher";

export default function Navigation() {
  return (
    <div className="z-10 flex items-center justify-between p-4 border-b">
      <h1>Autogen UI</h1> <ThemeSwitcher />
    </div>
  );
}

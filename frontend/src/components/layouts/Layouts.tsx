"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SideBar from "../elements/Sidebar";
interface LayoutsProps {
  children: ReactNode;
}
const Layouts = ({ children }: LayoutsProps) => {
  return (
    <div
      className="flex flex-col lg:flex-row lg:gap-5 justify-center overflow-x-hidden dark:bg-[#1E1E1E]"
      suppressHydrationWarning
    >
      <SideBar />
      <main
        className={cn(
          "no-scrollbar w-full scroll-smooth transition-all duration-300 lg:min-h-screen dark:bg-[#1E1E1E] px-2 md:px-0 lg:max-w-[824px]"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default Layouts;

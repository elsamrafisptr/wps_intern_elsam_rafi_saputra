import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "bg-white dark:bg-[#060606] p-6 rounded-lg",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Container;

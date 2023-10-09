"use client";

import React from "react";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div
      className={[
        pathname === "/" ? "max-w-[1140px]" : "",
        "flex justify-between mx-auto w-full lg:px-2.5 px-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default MainLayout;

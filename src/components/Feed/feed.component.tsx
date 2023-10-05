import React from "react";

const Feed = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
    // className={[
    //   useLocation().pathname === "/" ? "max-w-[1140px]" : "",
    //   "flex justify-between mx-auto w-full lg:px-2.5 px-0",
    // ].join(" ")}
    >
      {children}
    </div>
  );
};

export default Feed;

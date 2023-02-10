import React from "react";

function BigTitle({ children }: { children: string }) {
  return <h1 className="font-bold text-6xl">{children}</h1>;
}

export default BigTitle;

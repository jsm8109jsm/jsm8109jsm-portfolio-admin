import React from "react";

function SmallTitle({ children }: { children: string }) {
  return <h3 className="font-bold text-4xl">{children}</h3>;
}

export default SmallTitle;

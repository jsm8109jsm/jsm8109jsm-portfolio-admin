import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Sidebar() {
  const router = useRouter();
  console.log(router);
  return (
    <div className="w-64 bg-teal h-full fixed px-2.5 py-5">
      <Link href="/">
        <div className="w-full h-12 bg-black text-white justify-center text-4xl flex items-center rounded-10">
          asdf
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;

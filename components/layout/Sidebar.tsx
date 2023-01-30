import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Sidebar() {
  const router = useRouter();
  return (
    <div className="w-64 bg-teal h-full fixed px-2.5 py-5">
      <div className="text-white text-base">수식어</div>
      <Link href="/modifier">
        <div
          className={`w-full h-12 ${
            router.pathname === "/modifier" ? "bg-black text-white" : "text-black"
          } justify-center text-2xl flex items-center rounded-10 font-bold`}
        >
          수식어
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;

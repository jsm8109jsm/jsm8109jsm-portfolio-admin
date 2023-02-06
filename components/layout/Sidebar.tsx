import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Sidebar() {
  const router = useRouter();
  return (
    <div className="w-64 bg-teal h-full fixed px-2.5 py-5 flex flex-col gap-4">
      <div>
        <div className="text-white text-base">수식어</div>
        <Link href="/modifier">
          <div
            className={`w-full h-12 ${
              router.pathname === "/modifier"
                ? "bg-black text-white"
                : "text-black"
            } justify-center text-2xl flex items-center rounded-10 font-bold`}
          >
            수식어 관리
          </div>
        </Link>
      </div>
      <div>
        <div className="text-white text-base">기술 스택</div>
        <Link href="/skill">
          <div
            className={`w-full h-12 ${
              router.pathname === "/skill"
                ? "bg-black text-white"
                : "text-black"
            } justify-center text-2xl flex items-center rounded-10 font-bold`}
          >
            기술 스택 관리
          </div>
        </Link>
      </div>
      <div>
        <div className="text-white text-base">프로젝트</div>
        <Link href="/project">
          <div
            className={`w-full h-12 ${
              router.pathname === "/project"
                ? "bg-black text-white"
                : "text-black"
            } justify-center text-2xl flex items-center rounded-10 font-bold`}
          >
            프로젝트 관리
          </div>
        </Link>
        <Link href="/project/add">
          <div
            className={`w-full h-12 ${
              router.pathname === "/project/add"
                ? "bg-black text-white"
                : "text-black"
            } justify-center text-2xl flex items-center rounded-10 font-bold`}
          >
            프로젝트 등록
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

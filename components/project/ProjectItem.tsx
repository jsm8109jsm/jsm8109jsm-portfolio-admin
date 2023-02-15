import { Personal_Projects } from "@/pages/project";
import { modalState } from "@/store/modal";
import React from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";

function ProjectItem({ data }: { data: Personal_Projects }) {
  const [modal, setModal] = useRecoilState(modalState);
  return (
    <div
      className="rounded-20 p-5 bg-black relative flex flex-col gap=[25px] cursor-pointer"
      onClick={() =>
        setModal((prev) => {
          return {
            ...prev,
            isOpen: true,
            data: data,
          };
        })
      }
    >
      <Image src={String(data.url)} alt={`${data.name} 사진`} fill />
      <div>
        <h1 className="m-0 text-4xl text-center text-white font-black">{data.name}</h1>
      </div>
    </div>
  );
}

export default ProjectItem;

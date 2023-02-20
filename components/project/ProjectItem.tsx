import { Personal_Projects } from "@/pages/project";
import { modalState } from "@/store/modal";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { renderState } from "@/store/render";

function ProjectItem({ data }: { data: Personal_Projects }) {
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    setModal((prev) => {
      return {
        ...prev,
        isOpen: true,
        data: data,
      };
    });
  }, [data, setModal]);
  
  return (
    <div
      className="rounded-20 p-5 bg-black relative flex flex-col gap-5 cursor-pointer"
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
      <Image
        src={String(data.url)}
        alt={`${data.name} 사진`}
        fill
        className="!h-[auto] !relative"
      />
      <div>
        <h1 className="m-0 text-4xl text-center text-white font-black">
          {data.name}
        </h1>
        <h6 className="text-center m-0 text-lg text-[#808080]">{`(${data.start_month} ~ ${data.finish_month})`}</h6>
      </div>
      <span className="block text-white text-2xl text-center">
        {data.intro}
      </span>
    </div>
  );
}

export default ProjectItem;

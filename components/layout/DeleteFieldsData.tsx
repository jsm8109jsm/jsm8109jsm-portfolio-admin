import { modifier } from "@/pages/modifier";
import { Clear } from "@mui/icons-material";
import React from "react";
import SmallTitle from "./SmallTitle";

function DeleteFieldsData({
  deleteFunc,
  stringArr,
  title,
}: {
  deleteFunc: (id: number) => Promise<void>;
  stringArr: string[];
  title: string;
}) {
  return (
    <div className="flex gap-4 flex-col">
      <SmallTitle>{`${title} 삭제`}</SmallTitle>
      <div className="w-full flex gap-4 flex-wrap">
        {stringArr.map((item, index) => {
          return (
            <div
              className="bg-white p-2 rounded-full border-black border-[1px] flex items-center gap-1"
              key={index}
            >
              {item}
              <Clear
                className="cursor-pointer"
                onClick={() => {
                  deleteFunc(index);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteFieldsData;

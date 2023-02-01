import { modifier } from "@/pages/modifier";
import { Clear } from "@mui/icons-material";
import React from "react";
import SmallTitle from "./SmallTitle";

function DeleteDocsData({
  deleteFunc,
  docArr,
  title,
}: {
  deleteFunc: (id: string) => Promise<void>;
  docArr: modifier[];
  title: string;
}) {
  return (
    <div className="flex gap-4 flex-col">
      <SmallTitle>{`${title} 삭제`}</SmallTitle>
      <div className="w-full flex gap-4 flex-wrap">
        {docArr.map((item) => {
          return (
            <div
              className="bg-white p-2 rounded-full border-black border-[1px] flex items-center gap-1"
              key={item.id}
            >
              {item.modifier}
              <Clear
                className="cursor-pointer"
                onClick={() => {
                  deleteFunc(item.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeleteDocsData;

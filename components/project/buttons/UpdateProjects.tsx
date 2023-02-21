import { updatingDataState } from "@/store/updatingModal";
import { Build } from "@mui/icons-material";
import React from "react";
import { useRecoilState } from "recoil";

function UpdateProjects({
  name,
  size,
}: {
  name: string;
  size: "large" | "small" | "inherit" | "medium";
}) {
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  const sizes: { [key: string]: string } = {
    large: "w-[60px] h-[60px]",
    small: "w-[30px] h-[30px]",
  };
  return (
    <button
      className={`cursor-pointer duration-300 hover:scale-110 rounded-full bg-white border-[1px] border-[#000] border-solid relative inline-flex items-center justify-center ${
        sizes[size ?? "small"]
      }`}
      onClick={() => setUpdatingData((prev) => ({ ...prev, [name]: true }))}
    >
      <Build fontSize={size} sx={{ color: "#808080" }} />
    </button>
  );
}

export default UpdateProjects;

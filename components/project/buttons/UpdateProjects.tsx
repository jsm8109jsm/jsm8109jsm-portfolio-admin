import { updatingDataState } from "@/store/updatingModal";
import { fireStore } from "@/utils/Firebase";
import { Build } from "@mui/icons-material";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useRecoilState } from "recoil";

function UpdateProjects({ name, size }: { name: string; size: number }) {
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  return (
    <button
      className={`cursor-pointer duration-300 hover:scale-110 rounded-full bg-white border-[1px] border-[#000] border-solid p-[5px] w-[${size}px] h-[${size}px]`}
      onClick={() => setUpdatingData((prev) => ({ ...prev, [name]: true }))}
    >
      <Build />
    </button>
  );
}

export default UpdateProjects;

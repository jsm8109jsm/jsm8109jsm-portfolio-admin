import { fireStore } from "@/utils/Firebase";
import { Build } from "@mui/icons-material";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";

function UpdateProjects({
  name,
  newData,
  id,
  index,
  size,
}: {
  name: string;
  newData: string;
  id: string;
  index: number;
  size: number;
}) {
  const updateProject = async () => {
    try {
      const response = await updateDoc(
        doc(fireStore, `${index === 0 ? "personal" : "team"}_projects`, id),
        { [name]: newData }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className={`cursor-pointer duration-300 hover:scale-110 rounded-full bg-white border-[1px] border-[#000] border-solid p-[5px] w-[${size}px] h-[${size}px]`}
      onClick={() => updateProject()}
    >
      <Build />
    </button>
  );
}

export default UpdateProjects;

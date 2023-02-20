import { renderState } from "@/store/render";
import { updatingDataState } from "@/store/updatingModal";
import { fireStore } from "@/utils/Firebase";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useRecoilState } from "recoil";

function UpdatingProjectConfirm({
  name,
  newData,
  id,
  index,
}: {
  name: string;
  newData: string;
  id: string;
  index: number;
}) {
  const [render, setRender] = useRecoilState(renderState);
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);

  const updateProject = async () => {
    try {
      const projectRef = doc(
        fireStore,
        `${index === 0 ? "personal" : "team"}_projects`,
        id
      );
      const response = await updateDoc(projectRef, { [name]: newData });
      setRender((prev) => !prev);
      setUpdatingData((prev) => ({ ...prev, [name]: false }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      variant="contained"
      color="success"
      className="bg-[#2e7d32]"
      onClick={() => updateProject()}
    >
      확인
    </Button>
  );
}

export default UpdatingProjectConfirm;

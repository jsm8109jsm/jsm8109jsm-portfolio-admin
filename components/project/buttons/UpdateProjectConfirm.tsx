import { modalState } from "@/store/modal";
import { newDataState } from "@/store/newData";
import { renderState } from "@/store/render";
import { updatingDataState } from "@/store/updatingModal";
import { fireStore } from "@/utils/Firebase";
import { Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

function UpdatingProjectConfirm({
  name,
  newData,
  index,
}: {
  name: string;
  newData?: string;
  index: number;
}) {
  const [render, setRender] = useRecoilState(renderState);
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  const [modal, setModal] = useRecoilState(modalState);
  const setNewData = useSetRecoilState(newDataState);

  const { data } = modal;

  const updateProject = async () => {
    try {
      const projectRef = doc(
        fireStore,
        `${index === 0 ? "personal" : "team"}_projects`,
        data.projectId
      );
      const response = await updateDoc(projectRef, { [name]: newData });
      setRender((prev) => !prev);
      setUpdatingData((prev) => ({ ...prev, [name]: false }));
      setNewData((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setModal((prev) => {
  //     return {
  //       ...prev,
  //       data: data,
  //     };
  //   });
  // }, [data, setModal]);

  const updateArrayProject = async () => {
    try {
      const projectRef = doc(
        fireStore,
        `${index === 0 ? "personal" : "team"}_projects`,
        data.projectId
      );
      let stacks = data.stacks ?? [];

      const response = await updateDoc(projectRef, {
        stacks: [...stacks, newData],
      });
      setUpdatingData((prev) => ({ ...prev, stacks: false }));
      setRender((prev) => !prev);
      setNewData((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  const isUpdatingArray = () => {
    name !== "stacks" ? updateProject() : updateArrayProject();
  };

  return (
    <Button
      variant="contained"
      color="success"
      className="bg-[#2e7d32]"
      onClick={() => isUpdatingArray()}
    >
      확인
    </Button>
  );
}

export default UpdatingProjectConfirm;

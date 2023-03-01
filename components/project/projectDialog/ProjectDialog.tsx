import { dialogState } from "@/store/dialog";
import { modalState } from "@/store/modal";
import { renderState } from "@/store/render";
import { fireStore, storage } from "@/utils/Firebase";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

function ProjectDialog() {
  const [dialog, setDialog] = useRecoilState(dialogState);
  const [render, setRender] = useRecoilState(renderState);
  const [modal, setModal] = useRecoilState(modalState);
  const { isOpen, index, id, imageName } = dialog;

  const deleteProject = async () => {
    try {
      const ref = doc(
        fireStore,
        `${index === 0 ? "personal" : "team"}_projects`,
        id
      );
      const response = await deleteDoc(ref);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async () => {
    try {
      const imageRef = ref(
        storage,
        `images/${index === 0 ? "personal" : "team"}/${imageName}.png`
      );
      const response = await deleteObject(imageRef);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImageList = async () => {
    try {
      const imageRef = ref(
        storage,
        `images/${index === 0 ? "personal" : "team"}/projects/${imageName}`
      );
      const response = await deleteObject(imageRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setDialog((prev) => ({ ...prev, isOpen: false }))}
    >
      <div className="p-5">
        <DialogTitle>정말로 프로젝트를 삭제하시겠습니까?</DialogTitle>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              deleteProject();
              deleteImage();
              deleteImageList();
              setRender((prev) => !prev);
              setDialog((prev) => ({ ...prev, isOpen: false }));
              setModal((prev) => ({
                data: {
                  name: "",
                  start_month: "",
                  finish_month: "",
                  intro: "",
                  github_link: "",
                  stacks: [],
                  imageName: "",
                  feel: "",
                  hard: "",
                },
                isOpen: false,
                index: 0,
                value: 0,
              }));
            }}
          >
            확인
          </Button>
          <Button
            onClick={() => setDialog((prev) => ({ ...prev, isOpen: false }))}
          >
            취소
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default ProjectDialog;

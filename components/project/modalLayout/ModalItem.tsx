import { modalState } from "@/store/modal";
import { newDataState } from "@/store/newData";
import { updatingDataState } from "@/store/updatingModal";
import { TextField } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import UpdateProjectCancel from "../buttons/UpdateProjectCancel";
import UpdateProjectConfirm from "../buttons/UpdateProjectConfirm";
import UpdateProjects from "../buttons/UpdateProjects";

function ModalItem({
  name,
  index,
  size,
}: {
  name:
    | "name"
    | "start_month"
    | "finish_month"
    | "intro"
    | "github_link"
    | "imageName"
    | "feel"
    | "hard";
  index: number;
  size: "large" | "small" | "inherit" | "medium";
}) {
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  const [modal, setModal] = useRecoilState(modalState);
  const [newData, setNewData] = useRecoilState(newDataState);
  const { data } = modal;
  console.log(name, size);
  return (
    <div className="inline-flex justify-center gap-2.5 items-center">
      {!updatingData[name] ? (
        <>
          {data[name]}
          <UpdateProjects name={name} size={size} />
        </>
      ) : (
        <>
          <TextField
            label={name}
            value={newData[name]}
            variant="outlined"
            onChange={(e) =>
              setNewData((prev) => ({ ...prev, [name]: e.target.value }))
            }
          />
          <UpdateProjectConfirm
            name={name}
            newData={newData[name]}
            id={data.projectId}
            index={index}
          />
          <UpdateProjectCancel name={name} />
        </>
      )}
    </div>
  );
}

export default ModalItem;

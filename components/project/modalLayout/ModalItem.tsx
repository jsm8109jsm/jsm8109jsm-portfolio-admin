import { modalState } from "@/store/modal";
import { newDataState } from "@/store/newData";
import { updatingDataState } from "@/store/updatingModal";
import { TextField } from "@mui/material";
import React from "react";
import { VscGithub } from "react-icons/vsc";
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
    | "role"
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
  return (
    <div
      className={`inline-flex ${
        name === "github_link" ? "justify-start" : "justify-center"
      } gap-2.5 items-center`}
    >
      {!updatingData[name] ? (
        name !== "github_link" ? (
          <>
            {data[name]}
            <UpdateProjects name={name} size={size} />
          </>
        ) : (
          <>
            <a
              href={data.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="visited:text-white no-underline"
            >
              <button className="hover:bg-black/[0.85] bg-black p-2.5 cursor-pointer duration-300 rounded-10 border-none text-white flex gap-2.5 items-center">
                <span>자세히 보기</span>
                <VscGithub size={20} />
              </button>
            </a>
            <UpdateProjects name={name} size={size} />
          </>
        )
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
            index={index}
          />
          <UpdateProjectCancel name={name} />
        </>
      )}
    </div>
  );
}

export default ModalItem;

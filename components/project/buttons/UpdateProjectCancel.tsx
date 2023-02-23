import { newDataState } from "@/store/newData";
import { updatingDataState } from "@/store/updatingModal";
import { Button } from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

function UpdateProjectCancel({ name }: { name: string }) {
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  const setNewData = useSetRecoilState(newDataState);
  return (
    <Button
      variant="contained"
      color="error"
      className="bg-[#d32f2f]"
      onClick={() => {
        setUpdatingData((prev) => ({ ...prev, [name]: false }));
        setNewData((prev) => ({ ...prev, [name]: "" }));
      }}
    >
      취소
    </Button>
  );
}

export default UpdateProjectCancel;

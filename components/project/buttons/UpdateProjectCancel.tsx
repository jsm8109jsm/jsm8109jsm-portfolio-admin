import { updatingDataState } from "@/store/updatingModal";
import { Button } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";

function UpdateProjectCancel({ name }: { name: string }) {
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  return (
    <Button
      variant="contained"
      color="error"
      className="bg-[#d32f2f]"
      onClick={() => setUpdatingData((prev) => ({ ...prev, [name]: false }))}
    >
      취소
    </Button>
  );
}

export default UpdateProjectCancel;

import { TextField, Button } from "@mui/material";
import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useForm } from "react-hook-form";

function Modifier() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <Sidebar />
      <div className="pl-[19rem] w-full h-screen bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <h1 className="font-bold text-6xl">수식어 관리</h1>
        <form onSubmit={handleSubmit(() => {})}>
          <h3 className="font-bold text-4xl">수식어 추가</h3>
          <div className="my-4 flex items-center gap-4">
            <TextField
              id="outlined-basic"
              label="수식어 추가"
              variant="outlined"
              {...register("modifier", { required: true })}
              className="w-3/5"
            />
            <Button type="submit" variant="contained" className="bg-[#1976d2]">
              확인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modifier;

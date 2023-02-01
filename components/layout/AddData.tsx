import { Button, TextField } from "@mui/material";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import SmallTitle from "./SmallTitle";

function AddData({
  addFuc,
  title,
  docName,
}: {
  addFuc: (data: FieldValues) => Promise<void>;
  title: string;
  docName: string;
}) {
  const { register, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        addFuc(data);
      })}
    >
      <SmallTitle>{`${title} 등록`}</SmallTitle>
      <div className="my-4 flex items-center gap-4">
        <TextField
          id="outlined-basic"
          label={`${title} 등록`}
          variant="outlined"
          {...register(docName, { required: true })}
          className="w-3/5"
        />
        <Button type="submit" variant="contained" className="bg-[#1976d2]">
          확인
        </Button>
      </div>
    </form>
  );
}

export default AddData;

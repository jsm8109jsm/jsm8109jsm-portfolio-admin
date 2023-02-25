import { TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

function AddProjectInput({ label, name }: { label: string; name: string }) {
  const { register } = useFormContext();
  return (
    <div className="flex gap-4 items-center">
      <span className="text-2xl font-bold inline-block w-[110.12px]">
        {label}
      </span>
      <TextField
        label={label}
        {...register(name, { required: true })}
        variant="outlined"
        className="w-3/5"
      />
    </div>
  );
}

export default AddProjectInput;

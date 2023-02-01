import BigTitle from "@/components/layout/BigTitle";
import Sidebar from "@/components/layout/Sidebar";
import { fireStore } from "@/utils/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { options } from "@/components/skill/CascaderOption";
import SmallTitle from "@/components/layout/SmallTitle";
import { Button, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";

function Skill() {
  const [field, setField] = useState([]);
  const [comments, setComments] = useState<string[]>([]);

  const { register, handleSubmit, resetField } = useForm();
  const bucket = collection(fireStore, "skill");
  useEffect(() => {
    (async () => {
      try {
        const response = await getDocs(bucket);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bucket]);

  const displayRender = (labels: string[]) => labels[labels.length - 1];

  const onChange = async (value: any) => {
    try {
      const docRef = doc(fireStore, "skill", value[0]);
      const response = await getDoc(docRef);
      // console.log(response.data()?.[value[1]]);
      setField(value);
      setComments(response.data()?.[value[1]]);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (data: FieldValues) => {
    try {
      const docRef = doc(fireStore, "skill", field[0]);
      const newComments = comments;
      console.log(newComments);
      newComments.push(data.comment);
      const response = await updateDoc(docRef, { [field[1]]: newComments });
      resetField("comment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full h-screen bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>기술 스택 관리</BigTitle>
        <div className="flex gap-4 flex-col">
          <SmallTitle>기술 스택 선택</SmallTitle>
          <Cascader
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
            onChange={onChange}
          />
        </div>
        {field.length !== 0 ? (
          <>
            <div className="flex gap-4 flex-col">
              <SmallTitle>기술 스택 comment 추가</SmallTitle>
              <form
                className="my-4 flex items-center gap-4"
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  addComment(data);
                })}
              >
                <TextField
                  id="outlined-basic"
                  label="comment 등록"
                  variant="outlined"
                  {...register("comment", { required: true })}
                  className="w-3/5"
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-[#1976d2]"
                >
                  확인
                </Button>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Skill;

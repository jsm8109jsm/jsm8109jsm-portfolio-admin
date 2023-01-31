import { TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { FieldValues, useForm } from "react-hook-form";
import { fireStore } from "../../utils/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Clear } from "@mui/icons-material";
import BigTitle from "../../components/layout/BigTitle";
import SmallTitle from "../../components/layout/SmallTitle";

interface modifier {
  id: string;
  [x: string]: any;
}

function Modifier() {
  const [modifier, setModifier] = useState<modifier[]>([]);
  const { register, handleSubmit, resetField } = useForm();
  const [render, setRender] = useState(false);

  const bucket = collection(fireStore, "modifier");

  const addModifier = async (data: FieldValues) => {
    try {
      const response = await addDoc(bucket, data);
      // console.log(response);
      resetField("modifier");
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getDocs(bucket);
        const newData: modifier[] = [];
        response.docs.map((doc) => {
          newData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setModifier(newData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bucket, render]);

  const deleteModifier = async (id: string) => {
    const docRef = doc(fireStore, "modifier", id);
    try {
      await deleteDoc(docRef);
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full h-screen bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>수식어 관리</BigTitle>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            addModifier(data);
          })}
        >
          <SmallTitle>수식어 등록</SmallTitle>
          <div className="my-4 flex items-center gap-4">
            <TextField
              id="outlined-basic"
              label="수식어 등록"
              variant="outlined"
              {...register("modifier", { required: true })}
              className="w-3/5"
            />
            <Button type="submit" variant="contained" className="bg-[#1976d2]">
              확인
            </Button>
          </div>
        </form>
        <div className="flex gap-4 flex-col">
          <SmallTitle>수식어 삭제</SmallTitle>
          <div className="w-full flex gap-4">
            {modifier.map((item: modifier) => {
              return (
                <div
                  className="bg-white p-2 rounded-full border-black border-[1px] flex items-center gap-1"
                  key={item.id}
                >
                  {item.modifier}
                  <Clear
                    className="cursor-pointer"
                    onClick={() => {
                      deleteModifier(item.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modifier;

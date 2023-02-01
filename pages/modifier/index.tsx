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
import AddData from "../../components/layout/AddData";

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
      <div className="pl-[19rem] w-full min-h-screen h-full bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>수식어 관리</BigTitle>
        <AddData title="수식어" addFuc={addModifier} docName="modifier" />
        <div className="flex gap-4 flex-col">
          <SmallTitle>수식어 삭제</SmallTitle>
          <div className="w-full flex gap-4 flex-wrap">
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

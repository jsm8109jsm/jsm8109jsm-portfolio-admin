import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { FieldValues } from "react-hook-form";
import { fireStore } from "../../utils/Firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import BigTitle from "../../components/layout/BigTitle";
import AddData from "../../components/layout/AddData";
import DeleteDocsData from "../../components/layout/DeleteDocsData";

export interface modifier {
  id: string;
  [x: string]: any;
}

function Modifier() {
  const [modifier, setModifier] = useState<modifier[]>([]);
  const [render, setRender] = useState(false);

  const bucket = collection(fireStore, "modifier");

  const addModifier = async (data: FieldValues) => {
    try {
      const response = await addDoc(bucket, data);
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getDocs(bucket);
        console.log(response);
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
  }, [render]);

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
        <DeleteDocsData
          title="수식어"
          deleteFunc={deleteModifier}
          docArr={modifier}
        />
      </div>
    </>
  );
}

export default Modifier;

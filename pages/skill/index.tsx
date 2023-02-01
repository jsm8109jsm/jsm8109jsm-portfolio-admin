import BigTitle from "@/components/layout/BigTitle";
import Sidebar from "@/components/layout/Sidebar";
import { fireStore } from "@/utils/Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Cascader } from "antd";
import { options } from "@/components/skill/CascaderOption";

function Skill() {
  const [field, setField] = useState([]);
  const bucket = collection(fireStore, "skill");
  useEffect(() => {
    (async () => {
      try {
        const response = await getDocs(bucket);
        // const newData: modifier[] = [];
        // response.docs.map((doc) => {
        //   newData.push({
        //     id: doc.id,
        //     ...doc.data(),
        //   });
        // });
        // setModifier(newData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [bucket]);

  // useEffect(() => {
  //   console.log(field[1]);
  // }, [field]);

  const displayRender = (labels: string[]) => labels[labels.length - 1];

  const onChange = async (value: any) => {
    setField(value);
    try {
      const docRef = doc(fireStore, "skill", value[0]);
      const response = await getDoc(docRef);
      console.log(response.data()?.[value[1]]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full h-screen bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>기술 스택 관리</BigTitle>
        <Cascader
          options={options}
          expandTrigger="hover"
          displayRender={displayRender}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default Skill;

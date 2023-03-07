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
import Cascader from "antd/lib/cascader";
import { options } from "@/components/skill/SkillCascaderOption";
import SmallTitle from "@/components/layout/SmallTitle";
import { FieldValues } from "react-hook-form";
import AddData from "@/components/layout/AddData";
import DeleteFieldsData from "@/components/layout/DeleteFieldsData";
import SkillLevel from "@/components/layout/SkillLevel";
import { useRecoilState } from "recoil";
import { skillLevelState } from "@/store/skillLevel";

function Skill() {
  const [field, setField] = useState([]);
  const [comments, setComments] = useState<string[]>([]);
  const [render, setRender] = useState(false);
  const [skillLevel, setSkillLevel] = useRecoilState(skillLevelState);

  const bucket = collection(fireStore, "skill");

  const displayRender = (labels: string[]) => labels[labels.length - 1];

  const onChange = (value: any) => {
    setField(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const docRef = doc(fireStore, "skill", field[0]);
        const response = await getDoc(docRef);
        setComments(response.data()?.[field[1]]);
        const skillLevelRef = doc(
          fireStore,
          "skill_level",
          `${field[0]}_level`
        );
        const skillLevelResponse = await getDoc(skillLevelRef);
        setSkillLevel(skillLevelResponse.data()?.[`${field[1]}_level`]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [field, render]);

  const addComment = async (data: FieldValues) => {
    try {
      const docRef = doc(fireStore, "skill", field[0]);
      let newComments;
      if (typeof comments !== "undefined") {
        newComments = comments;
        newComments.push(data.comment);
      } else {
        newComments = [data.comment];
      }
      console.log(newComments);
      const response = await updateDoc(docRef, { [field[1]]: newComments });

      setRender((prev) => !prev);
    } catch (error) {
      setField([]);
      console.log(error);
    }
  };

  const deleteComment = async (id: number) => {
    try {
      const docRef = doc(fireStore, "skill", field[0]);
      const newComments = comments;
      newComments.splice(id, 1);
      const response = await updateDoc(docRef, { [field[1]]: newComments });
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full min-h-screen h-full bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
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
        {typeof field === "undefined" || field.length !== 0 ? (
          <>
            <SkillLevel field={field} />
            <AddData title="수식어" addFuc={addComment} docName="comment" />
            <DeleteFieldsData
              title="수식어"
              deleteFunc={deleteComment}
              stringArr={comments}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default Skill;

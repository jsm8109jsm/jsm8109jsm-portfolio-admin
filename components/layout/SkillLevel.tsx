import { skillLevelState } from "@/store/skillLevel";
import { fireStore } from "@/utils/Firebase";
import { Rating } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SmallTitle from "./SmallTitle";

function SkillLevel({ field }: { field: string[] }) {
  const [skillLevel, setSkillLevel] = useRecoilState(skillLevelState);
  const updatingSkillLevel = async (newValue: number | null) => {
    try {
      const docRef = doc(fireStore, "skill_level", `${field[0]}_level`);
      const response = await updateDoc(docRef, {
        [`${[field[1]]}_level`]: newValue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SmallTitle>숙련도 조정</SmallTitle>
      <Rating
        name="simple-controlled"
        value={skillLevel ?? 0}
        onChange={(event, newValue) => {
          setSkillLevel(newValue);
          updatingSkillLevel(newValue);
        }}
      />
    </div>
  );
}

export default SkillLevel;

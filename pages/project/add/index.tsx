import BigTitle from "@/components/layout/BigTitle";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button, TextField } from "@mui/material";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { Clear, Close, Layers, Mood, MoodBad } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { storage } from "@/utils/Firebase";

import Slider from "react-slick";
import AddProjectInput from "@/components/layout/AddProjectInput";
import AddProjectForm from "@/components/layout/AddProjectForm";

interface ImageList {
  url: string;
  name: string;
}

function Add() {
  const [value, setValue] = useState(0);
  const [render, setRender] = useState(false);
  // const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<ImageList[]>([]);
  // const { register, handleSubmit, resetField } = useForm();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setImageList([]);
  };

  useEffect(() => {
    setImageList([]);
    const imageListRef = ref(
      storage,
      `images/${value === 0 ? "personal" : "team"}`
    );
    listAll(imageListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [
            ...prev,
            {
              name: item.fullPath,
              url: url,
            },
          ]);
        });
      });
    });
  }, [value, render]);

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full min-h-screen h-full bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>프로젝트 관리</BigTitle>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="개인 프로젝트" className="bg-white" />
          <Tab label="팀 프로젝트" className="bg-white" />
        </Tabs>
        <AddProjectForm index={value} />
      </div>
    </>
  );
}

export default Add;

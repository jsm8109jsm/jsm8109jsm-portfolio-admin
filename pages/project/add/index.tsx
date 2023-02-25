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

interface ImageList {
  url: string;
  name: string;
}

function Add() {
  const [value, setValue] = useState(0);
  const [render, setRender] = useState(false);
  // const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<ImageList[]>([]);
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

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

  const deleteImage = async (name: string) => {
    try {
      const desertRef = ref(storage, name);
      const response = await deleteObject(desertRef);
      console.log(response);
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  const methods = useForm();
  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full min-h-screen h-full bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>프로젝트 관리</BigTitle>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="개인 프로젝트" className="bg-white" />
          <Tab label="팀 프로젝트" className="bg-white" />
        </Tabs>
        {/* <Button variant="contained" component="label" className="w-48">
          Image Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) {
                const imageUpload = event.target.files[0];
                if (imageUpload === null) return;

                const imageRef = ref(
                  storage,
                  `images/${value === 0 ? "personal" : "team"}/${
                    imageUpload.name
                  }`
                );
                uploadBytes(imageRef, imageUpload).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                    setImageList((prev) => [
                      ...prev,
                      {
                        name: `images/${value === 0 ? "personal" : "team"}/${
                          imageUpload.name
                        }`,
                        url: url,
                      },
                    ]);
                  });
                });
                setRender((prev) => !prev);
              }
            }}
          />
        </Button>
        <Slider {...settings} className="w-48">
          {imageList.map((el, index) => {
            return (
              <div className="relative w-48" key={index}>
                <Image
                  src={el.url}
                  alt="프로젝트 사진"
                  width={192}
                  height={108}
                />
                <Close
                  onClick={() => deleteImage(el.name)}
                  className="cursor-pointer absolute right-0 top-0"
                />
              </div>
            );
          })}
        </Slider> */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data: FieldValues) => {
              console.log(data);
            })}
            className="flex flex-col gap-5"
          >
            <AddProjectInput name="title" label="제목" />
            <AddProjectInput name="start_month" label="시작한 달" />
            <AddProjectInput name="finish_month" label="끝마친 달" />
            <AddProjectInput name="intro" label="한 줄 소개" />
            <AddProjectInput name="feel" label="느낀 점" />
            <AddProjectInput name="hard" label="힘들었던 점" />
            <AddProjectInput name="github_link" label="깃허브 링크" />
            <Button type="submit" className="w-48">
              asdf
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export default Add;

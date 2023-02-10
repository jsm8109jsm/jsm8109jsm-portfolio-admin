import BigTitle from "@/components/layout/BigTitle";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { Close } from "@mui/icons-material";

import { storage } from "@/utils/Firebase";

import Slider from "react-slick";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
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

  console.log(imageList);

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

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full min-h-screen h-full bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>프로젝트 관리</BigTitle>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="개인 프로젝트" className="bg-white" />
          <Tab label="팀 프로젝트" className="bg-white" />
        </Tabs>
        <Button variant="contained" component="label" className="w-48">
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
        </Slider>

        {/* <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider> */}
      </div>
    </>
  );
}

export default Add;

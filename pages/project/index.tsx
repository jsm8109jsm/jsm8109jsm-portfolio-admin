import BigTitle from "@/components/layout/BigTitle";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Image from "next/image";

import { storage } from "@/utils/Firebase";

function Project() {
  const [value, setValue] = useState(0);
  const [render, setRender] = useState(false);
  // const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);

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
      console.log(response);
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
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
        <Button variant="contained" component="label" className="w-24">
          Upload
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
                    setImageList((prev) => [...prev, url]);
                  });
                });
                setRender((prev) => !prev);
              }
            }}
          />
        </Button>
        {imageList.map((el, index) => {
          return (
            <Image
              key={index}
              src={el}
              alt="프로젝트 사진"
              width={100}
              height={100}
            />
          );
        })}
      </div>
    </>
  );
}

export default Project;

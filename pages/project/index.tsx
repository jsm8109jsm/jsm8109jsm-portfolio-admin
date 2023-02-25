import BigTitle from "@/components/layout/BigTitle";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Image from "next/image";

import { fireStore, storage } from "@/utils/Firebase";
import { collection, getDocs } from "firebase/firestore";
import ProjectItem from "@/components/project/ProjectItem";
import { renderState } from "@/store/render";
import { useRecoilState } from "recoil";

export interface Personal_Projects {
  [key: string]: any;
}

function Project() {
  const [value, setValue] = useState(0);
  const [render, setRender] = useRecoilState(renderState);
  // const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [projects, setProjects] = useState<Personal_Projects[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
    setImageList([]);
  };

  // useEffect(() => {
  //   setImageList([]);
  //   const imageListRef = ref(
  //     storage,
  //     `images/${value === 0 ? "personal" : "team"}`
  //   );
  //   listAll(imageListRef).then((response) => {
  //     response.items.map((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, [value, render]);

  useEffect(() => {
    (async () => {
      try {
        const bucket = collection(
          fireStore,
          `${value === 0 ? "personal" : "team"}_projects`
        );
        const response = await getDocs(bucket);
        let newData: Personal_Projects[] = [];

        response.docs.map((doc) => {
          newData.push({ ...doc.data(), projectId: doc.id });
        });

        const imageListRef = ref(
          storage,
          `images/${value === 0 ? "personal" : "team"}`
        );
        listAll(imageListRef).then((response) => {
          response.items.map((item) => {
            getDownloadURL(item).then((url) => {
              newData = newData.map((data) => {
                console.log(item.name.slice(0, -4), data.imageName);
                return data.imageName === item.name.slice(0, -4)
                  ? { ...data, url: url }
                  : data.url
                  ? data
                  : { ...data, url: "/" };
              });
              setProjects(newData);
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value, render]);

  console.log(projects);

  return (
    <>
      <Sidebar />
      <div className="pl-[19rem] w-full min-h-screen h-full bg-lightBeige py-12 pr-12 flex gap-16 flex-col">
        <BigTitle>프로젝트 관리</BigTitle>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="개인 프로젝트" className="bg-white" />
          <Tab label="팀 프로젝트" className="bg-white" />
        </Tabs>
        <div className="grid grid-cols-3 gap-5">
          {projects.map((item) => {
            return <ProjectItem key={item.id} data={item}></ProjectItem>;
          })}
        </div>
      </div>
    </>
  );
}

export default Project;

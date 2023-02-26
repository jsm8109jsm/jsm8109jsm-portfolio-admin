import { fireStore, storage } from "@/utils/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import AddProjectInput from "./AddProjectInput";
import { useRouter } from "next/router";

function AddProjectForm({ index }: { index: number }) {
  const methods = useForm();
  const [image, setImage] = useState<File>();
  const router = useRouter();
  const [length, setLength] = useState(0);

  const addProject = async (data: FieldValues) => {
    try {
      const bucket = collection(
        fireStore,
        `${index === 0 ? "personal" : "team"}_projects`
      );
      const response = await addDoc(bucket, { ...data, id: length });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addImage = async (data: FieldValues) => {
    if (image === undefined) return;
    try {
      const imageRef = ref(
        storage,
        `images/${index === 0 ? "personal" : "team"}/${data.imageName}.png`
      );
      await uploadBytes(imageRef, image);
    } catch (error) {
      console.log(error);
    }

    // .then((snapshot) => {
    //   getDownloadURL(snapshot.ref)
    //   .then((url) => {
    //     setImageList((prev) => [
    //       ...prev,
    //       {
    //         name: `images/${index === 0 ? "personal" : "team"}/${
    //           data.imageName
    //         }.png`,
    //         url: url,
    //       },
    //     ]);
    //   });
    // });
  };

  const addImageList = async (data: FieldValues) => {
    if (image === undefined) return;
    try {
      const imageRef = ref(
        storage,
        `images/${index === 0 ? "personal" : "team"}/projects/${
          data.imageName
        }/0.png`
      );
      await uploadBytes(imageRef, image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const bucket = collection(
          fireStore,
          `${index === 0 ? "personal" : "team"}_projects`
        );

        const response = await getDocs(bucket);
        console.log(response.docs.length);
        setLength(response.docs.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [index]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data: FieldValues) => {
          addProject(data);
          addImage(data);
          addImageList(data);
          router.push("/project");
        })}
        className="flex flex-col gap-5"
      >
        <AddProjectInput name="name" label="제목" />
        <AddProjectInput name="start_month" label="시작한 달" />
        <AddProjectInput name="finish_month" label="끝마친 달" />
        <AddProjectInput name="intro" label="한 줄 소개" />
        <AddProjectInput name="feel" label="느낀 점" />
        <AddProjectInput name="hard" label="힘들었던 점" />
        <AddProjectInput name="github_link" label="깃허브 링크" />
        <AddProjectInput name="imageName" label="대표 이미지" />
        <Button variant="contained" component="label" className="w-48">
          대표 이미지 업로드
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => {
              if (e.target.files) setImage(e.target.files[0]);
            }}
          />
        </Button>
        <Button type="submit" className="w-48 bg-[#1976d2]" variant="contained">
          생성
        </Button>
      </form>
    </FormProvider>
  );
}

export default AddProjectForm;

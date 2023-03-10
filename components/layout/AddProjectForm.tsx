import { fireStore, storage } from "@/utils/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import AddProjectInput from "./AddProjectInput";
import { useRouter } from "next/router";

function AddProjectForm({ index }: { index: number }) {
  const { register, handleSubmit } = useForm();
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
    <form
      onSubmit={handleSubmit((data: FieldValues) => {
        addProject(data);
        addImage(data);
        addImageList(data);
        router.push("/project");
      })}
      className="flex flex-col gap-5"
    >
      <AddProjectInput register={register} name="name" label="??????" />
      <AddProjectInput
        register={register}
        name="start_month"
        label="????????? ???"
      />
      <AddProjectInput
        register={register}
        name="finish_month"
        label="????????? ???"
      />
      <AddProjectInput register={register} name="intro" label="??? ??? ??????" />
      {index === 1 && (
        <AddProjectInput register={register} name="role" label="?????? ??????" />
      )}
      <AddProjectInput register={register} name="feel" label="?????? ???" />
      <AddProjectInput register={register} name="hard" label="???????????? ???" />
      <AddProjectInput
        register={register}
        name="github_link"
        label="????????? ??????"
      />
      <AddProjectInput
        register={register}
        name="imageName"
        label="?????? ?????????"
      />
      <Button variant="contained" component="label" className="w-48">
        ?????? ????????? ?????????
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
        ??????
      </Button>
    </form>
  );
}

export default AddProjectForm;

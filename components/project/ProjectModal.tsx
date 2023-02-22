import React, { useEffect, useState } from "react";
import { Modal, Skeleton, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { modalState } from "@/store/modal";
import { ref } from "firebase/storage";
import { listAll } from "firebase/storage";
import { fireStore, storage } from "@/utils/Firebase";
import { getDownloadURL } from "firebase/storage";
import { VscGithub } from "react-icons/vsc";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Mood,
  MoodBad,
} from "@mui/icons-material";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updatingDataState } from "@/store/updatingModal";
import { newDataState } from "@/store/newData";
import ModalItem from "./modalLayout/ModalItem";
import { doc, updateDoc } from "firebase/firestore";
import { Clear, Add } from "@mui/icons-material";
import { renderState } from "@/store/render";
import UpdateProjectConfirm from "./buttons/UpdateProjectConfirm";
import UpdateProjectCancel from "./buttons/UpdateProjectCancel";

function ProjectModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [imageIndex, setImageIndex] = useState(1);
  const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
  const [render, setRender] = useRecoilState(renderState);

  const [imageList, setImageList] = useState<string[]>([]);
  const [newData, setNewData] = useRecoilState(newDataState);
  const [newStack, setNewStack] = useState("");

  const { data, isOpen, value } = modal;
  const beforeChange = (oldIndex: number, newIndex: number) => {
    setImageIndex(newIndex + 1);
  };

  const settings = {
    beforeChange: beforeChange,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    prevArrow: <ChevronLeft className="text-black" />,
    nextArrow: <ChevronRight className="text-black" />,
  };
  useEffect(() => {
    (async () => {
      try {
        setImageList([]);
        const imageListRef = ref(
          storage,
          `images/${value === 0 ? "personal" : "team"}/projects/${
            data.imageName
          }`
        );
        listAll(imageListRef).then((response) => {
          response.items.map((item) => {
            getDownloadURL(item).then((url) => {
              setImageList((prev) => [...prev, url]);
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data.imageName, value]);

  const deleteStacks = async (index: number) => {
    try {
      const projectRef = doc(
        fireStore,
        `${value === 0 ? "personal" : "team"}_projects`,
        data.projectId
      );
      const stacks = data.stacks.filter(
        (stack: string, i: number) => i !== index
      );

      const response = await updateDoc(projectRef, { stacks: stacks });
      console.log(response);
      setUpdatingData((prev) => ({ ...prev, stacks: false }));
      setRender((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
      open={isOpen}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white p-8 rounded-30 focus-visible:outline-none">
        <h1 className="text-5xl text-center m-0 font-black">
          <ModalItem name="name" index={value} size="large" />
        </h1>
        <h6 className="text-[#808080] m-0 text-center text-2xl">
          <ModalItem name="start_month" index={value} size="small" /> ~{" "}
          <ModalItem name="finish_month" index={value} size="small" />
        </h6>
        <div className="flex gap-10 w-full mt-5">
          {imageList.length > 0 ? (
            <div className="w-[22.5rem]">
              <Slider {...settings}>
                {imageList.map((url, index) => (
                  <Image
                    className="!h-[auto] !relative"
                    src={url}
                    alt={`${data.name} 사진`}
                    key={index}
                    fill
                  />
                ))}
              </Slider>
              <span className="text-center block">{`${imageIndex} / ${imageList.length}`}</span>
            </div>
          ) : (
            <Skeleton variant="rectangular" width={360} height={225.3} />
          )}
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 w-full max-h-60 overflow-y-scroll">
              <h3 className="text-2xl m-0 mb-2.5 text-center font-bold">
                <ModalItem name="intro" index={value} size="small" />
              </h3>
              <div>
                <h4 className="item-title">
                  <Layers />
                  사용한 기술 스택
                </h4>
                <div className="flex flex-wrap gap-2.5 w-full items-center">
                  {data.stacks &&
                    data.stacks.map((stack: string, index: number) => (
                      <div
                        key={index}
                        className="bg-white rounded-[5px] p-[5px] border-[1px] border-solid border-[#000]"
                      >
                        {stack}
                        <Clear
                          className="cursor-pointer"
                          onClick={() => deleteStacks(index)}
                        />
                      </div>
                    ))}
                  {!updatingData.stacks ? (
                    <>
                      <Add
                        className="cursor-pointer"
                        onClick={() =>
                          setUpdatingData((prev) => ({ ...prev, stacks: true }))
                        }
                      />
                    </>
                  ) : (
                    <>
                      <TextField
                        label="stacks"
                        value={newStack}
                        variant="outlined"
                        onChange={(e) => setNewStack(e.target.value)}
                      />
                      <UpdateProjectConfirm
                        name="stacks"
                        newData={newStack}
                        index={value}
                      />
                      <UpdateProjectCancel name="stacks" />
                    </>
                  )}
                </div>
              </div>
              <div>
                <h4 className="item-title">
                  <Mood />
                  느낀 점
                </h4>
                <ModalItem name="feel" index={value} size="small" />
              </div>
              <div>
                <h4 className="item-title">
                  <MoodBad />
                  힘들었던 점
                </h4>
                <ModalItem name="hard" index={value} size="small" />
              </div>
            </div>
            <ModalItem name="github_link" index={value} size="small" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;

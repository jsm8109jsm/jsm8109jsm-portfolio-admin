import React, { useEffect, useState } from "react";
import { Modal, Skeleton } from "@mui/material";
import { useRecoilState } from "recoil";
import { modalState } from "@/store/modal";
import { ref } from "firebase/storage";
import { listAll } from "firebase/storage";
import { storage } from "@/utils/Firebase";
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
import UpdateProjects from "./buttons/UpdateProjects";

interface NewData {
  name: string;
  start_date: string;
  end_date: string;
  intro: string;
  github_link: string;
  stacks: string[];
  imageName: string;
  feel: string;
  hard: string;
}

function ProjectModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [imageIndex, setImageIndex] = useState(1);
  const [newData, setNewData] = useState<NewData>({
    name: "",
    start_date: "",
    end_date: "",
    intro: "",
    github_link: "",
    stacks: [],
    imageName: "",
    feel: "",
    hard: "",
  });

  const [imageList, setImageList] = useState<string[]>([]);

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

  return (
    <Modal
      onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
      open={isOpen}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-white p-8 rounded-30 focus-visible:outline-none">
        <h1 className="text-5xl text-center m-0 font-black">
          {data.name}
          <UpdateProjects
            name="name"
            newData={newData.name}
            id={data.projectId}
            index={value}
            size={60}
          />
        </h1>
        <h6 className="text-[#808080] m-0 text-center text-2xl">{`(${data.start_month} ~ ${data.finish_month})`}</h6>
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
                {data.intro}
              </h3>
              <div>
                <h4 className="item-title">
                  <Layers />
                  사용한 기술 스택
                </h4>
                <div className="flex flex-wrap gap-2.5 w-full">
                  {data.stacks &&
                    data.stacks.map((stack: string, index: number) => (
                      <div
                        key={index}
                        className="bg-white rounded-[5px] p-[5px] border-[1px] border-solid border-[#000]"
                      >
                        {stack}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="item-title">
                  <Mood />
                  느낀 점
                </h4>
                {data.feel}
              </div>
              <div>
                <h4 className="item-title">
                  <MoodBad />
                  힘들었던 점
                </h4>
                {data.hard}
              </div>
            </div>
            <a
              href={data.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="visited:text-white no-underline"
            >
              <button className="hover:bg-black/[0.85] bg-black p-2.5 cursor-pointer duration-300 rounded-10 border-none text-white flex gap-2.5 items-center">
                <span>자세히 보기</span>
                <VscGithub size={20} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;

import React, { useEffect, useState } from "react";
import { Modal, Skeleton } from "@mui/material";
import { useRecoilState } from "recoil";
import { modalState } from "@/store/modal";
import { ref } from "firebase/storage";
import { listAll } from "firebase/storage";
import { storage } from "@/utils/Firebase";
import { getDownloadURL } from "firebase/storage";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProjectModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [imageIndex, setImageIndex] = useState(1);

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
        <h1 className="text-5xl text-center m-0 font-black">{data.name}</h1>
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
          <div className="flex flex-col gap-5 w-full"></div>
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;

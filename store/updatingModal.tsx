import { Personal_Projects } from "@/pages/project";
import { atom } from "recoil";

interface UpdatingData {
  name: boolean;
  start_month: boolean;
  finish_month: boolean;
  intro: boolean;
  github_link: boolean;
  stacks: boolean;
  imageName: boolean;
  feel: boolean;
  hard: boolean;
}

export const updatingDataState = atom<UpdatingData>({
  key: "updaringData",
  default: {
    name: false,
    start_month: false,
    finish_month: false,
    intro: false,
    github_link: false,
    stacks: false,
    imageName: false,
    feel: false,
    hard: false,
  },
});

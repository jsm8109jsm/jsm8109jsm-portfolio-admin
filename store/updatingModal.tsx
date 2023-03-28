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
  role?: boolean;
  hard: boolean;
  part: boolean;
}

export const updatingDataState = atom<UpdatingData>({
  key: "updatingData",
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
    part: false,
  },
});

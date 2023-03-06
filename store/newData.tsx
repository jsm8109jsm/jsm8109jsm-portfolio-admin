import { Personal_Projects } from "@/pages/project";
import { atom } from "recoil";

interface NewData {
  name: string;
  start_month: string;
  finish_month: string;
  intro: string;
  github_link: string;
  stacks: string[];
  imageName: string;
  feel: string;
  hard: string;
  role?: string;
}

export const newDataState = atom<NewData>({
  key: `NewDataState`,
  default: {
    name: "",
    start_month: "",
    finish_month: "",
    intro: "",
    github_link: "",
    stacks: [],
    imageName: "",
    feel: "",
    hard: "",
  },
});

import { Personal_Projects } from "@/pages/project";
import { atom } from "recoil";

interface UpdatingData {
  name: boolean;
  start_date: boolean;
  end_date: boolean;
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
    start_date: false,
    end_date: false,
    intro: false,
    github_link: false,
    stacks: false,
    imageName: false,
    feel: false,
    hard: false,
  },
});

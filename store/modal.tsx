import { Personal_Projects } from "@/pages/project";
import { atom } from "recoil";


export const modalState = atom<{
  isOpen: boolean;
  data: Personal_Projects;
  value: number;
}>({
  key: "ModalState",
  default: {
    isOpen: false,
    data: {},
    value: 0,
  },
});

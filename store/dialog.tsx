import { atom } from "recoil";

export const dialogState = atom<{
  isOpen: boolean;
  index: number;
  id: string;
  imageName: string;
}>({
  key: `DialogState`,
  default: {
    isOpen: false,
    index: 0,
    id: "",
    imageName: "",
  },
});

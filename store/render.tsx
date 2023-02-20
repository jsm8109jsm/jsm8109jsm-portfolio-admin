import { atom } from "recoil";

export const renderState = atom<boolean>({
  key: `render`,
  default: false,
});

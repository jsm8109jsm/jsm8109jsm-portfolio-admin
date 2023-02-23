import { atom } from "recoil";

export const skillLevelState = atom<number | null>({
  key: `skillLevel`,
  default: 0,
});

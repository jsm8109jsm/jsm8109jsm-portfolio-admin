import ProjectModal from "@/components/project/ProjectModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <ProjectModal />
    </RecoilRoot>
  );
}

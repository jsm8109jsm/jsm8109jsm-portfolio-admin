import ProjectDialog from "@/components/project/projectDialog/ProjectDialog";
import ProjectModal from "@/components/project/ProjectModal";
import "@/styles/globals.css";
import useRedirect from "@/hooks/useRedirect";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  useRedirect();
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <ProjectModal />
      <ProjectDialog />
    </RecoilRoot>
  );
}

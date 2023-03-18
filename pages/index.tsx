import Head from "next/head";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth, firebase } from "@/utils/Firebase";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [ment, setMent] = useState("당신은 정승민인가요????");
  const newAuth = getAuth();
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  useEffect(() => {
    const _session_key = `firebase:authUser:${process.env.NEXT_PUBLIC_API_KEY}:[DEFAULT]`;
    const { uid } = JSON.parse(sessionStorage.getItem(_session_key) || "{}");
    if (
      uid === process.env.NEXT_PUBLIC_FIREBASE_UID ||
      uid === process.env.NEXT_PUBLIC_FIREBASE_UID2
    ) {
      router.push("/modifier");
    }
  }, []);
  const Login = async () => {
    try {
      await setPersistence(newAuth, browserSessionPersistence);
      try {
        const response = await signInWithPopup(auth, provider);
        if (
          response.user.uid !== process.env.NEXT_PUBLIC_FIREBASE_UID ||
          response.user.uid !== process.env.NEXT_PUBLIC_FIREBASE_UID2
        ) {
          setMent("당신은 정승민이 아니에요!!!!");
          throw new Error("당신은 정승민이 아니에요!");
        } else {
          // localStorage.setItem('token', response.user)
          router.push("/modifier");
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="bg-lightBeige h-screen py-6">
        <h1 className="text-9xl text-center font-title">{ment}</h1>
        <FcGoogle
          onClick={Login}
          className="cursor-pointer my-0 mx-auto"
          size={500}
        />
      </main>
    </>
  );
}

import Head from "next/head";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/utils/Firebase";

export default function Home() {
  const Login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((data) => {
      console.log(data.user);
    });
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={Login} className="text-3xl font-bold underline">
          asdf
        </button>
      </main>
    </>
  );
}

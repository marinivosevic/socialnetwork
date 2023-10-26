"use client"
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../../../../firebase/config";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [loginEmail,setLoginEmail] = useState("");
  const [loginPassword,setLoginPassword] = useState("");

  const signInWithGoogle = async () => {
    console.log("radi");
    const provider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(
        auth,
        provider
      );

      if (result.user) {
        router.push("/");
      }
      
    } catch(error) {
     
      console.error("Error logging with google:",error);
    }
  };


  const signInWithEmail = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      if (user.user) {
        router.push("/");
      }
      console.log("radi" + loginEmail + loginPassword);
    } catch(error) {
      
      console.error("Error logging with email:",error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
          <input
            type="text"
            placeholder="Email"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </div>

        <button onClick={signInWithEmail()} className="transform rounded-sm bg-sky-600 py-2 text-white font-bold duration-300 hover:bg-sky-400">
          LOG IN
        </button>

        <p className="text-center text-lg">
          No account?
          <Link
            href="/Register"
            className="font-medium text-sky-500 underline-offset-4 hover:underline"
          >
            Create One
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Page;

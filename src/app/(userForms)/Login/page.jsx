"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase/config";
import { useRouter } from "next/navigation";
import { Formik, Form, Field,useField  } from "formik";
import * as Yup from 'yup';

const Page = () => {
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signInWithGoogle = async () => {
    console.log("radi");

    const provider = new GoogleAuthProvider();
    try {
      const user = await signInWithPopup(auth, provider);

      if (result.user) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging with google:", error);
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
    } catch (error) {
      console.error("Error logging with email:", error);
    }
  };

 

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Required"),
          password: Yup.string()
            .max(16, "Must be 16 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-[30rem] flex-col space-y-10"
          >
            <div className="text-center text-4xl font-medium">Log In</div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
              <input
                id="email"
                name="email"
                placeholder="Email"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="transform rounded-sm bg-sky-600 py-2 text-white font-bold duration-300 hover:bg-sky-400"
            >
              LOG IN
            </button>

            <p className="text-center text-lg">
              No account?
              <a
                href="/Register"  // Use an anchor tag instead of Link
                className="font-medium text-sky-500 underline-offset-4 hover:underline"
              >
                Create One
              </a>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default Page;

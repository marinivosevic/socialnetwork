"use client";
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
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
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging with google:", error);
    }
  };

  const signInWithEmail = async (values) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
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
          email: Yup.string().required("Required").email("Must be valid email"),
          password: Yup.string()
            .max(16, "Must be 16 characters or less")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            signInWithEmail(values)
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
            <button
                    onClick={() => signInWithGoogle()}
                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-bottom	"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="inline-block ml-0">Google Sign In</span>
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

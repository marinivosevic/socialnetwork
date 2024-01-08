"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import { auth, db } from "../../../../firebase/config";
import { useRouter } from "next/navigation";
import { Formik} from "formik";
import * as Yup from 'yup';

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);


  const signUpWithEmail = async (values) => {
    console.log("radi" + values.email + values.password);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await addDoc(collection(db, "users"), {
        id: user.user?.uid,
        username: values.username,
        email:values.email,
        friends:[],
        likeNum:0,
        numOfPosts:0,
        photoURL:"https://firebasestorage.googleapis.com/v0/b/twitterclone-b784a.appspot.com/o/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png?alt=media&token=3ed46075-421e-4fde-8929-8c3f2c51e415",
      });

      if (user.user) {
        router.push("/");
      }
      console.log("radi sve " + values.email + values.password);
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
          name:"",
          surname:"",
          confirmPassword:"",
          username:""
        }}
        validationSchema={Yup.object({
          email: Yup.string()
          .required("Required")
          .email('Must be a valid email'),
          password: Yup.string()
            .min(8, "Password be 8 characters or more")
            .required("Required"),
          name: Yup.string()
          .required("Required")
          .max(30,"Name be 30 characters or less")
          .min(2,"Name be longer then 2 charachters"),
          surname:Yup.string().required("Required")
          .max(30,"Surname be 30 characters or less")
          .min(2,"Surname be longer then 2 charachters"),
          confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"Passwords must match").required("Required"),
          username:Yup.string().required("Required")
          .max(30,"Username be 30 characters or less")
          .min(2,"Username be longer then 2 charachters")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            
            signUpWithEmail(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-[30rem] flex-col space-y-10"
          >
            <div className="text-center text-4xl font-medium">Register</div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
              <input
                id="name"
                name="name"
                placeholder="Name"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
              <input
                id="surname"
                name="surname"
                placeholder="Surname"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                {...formik.getFieldProps("surname")}
              />
              {formik.touched.surname && formik.errors.surname ? (
                <div>{formik.errors.surname}</div>
              ) : null}
            </div>

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
                id="username"
                name="username"
                placeholder="Username"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
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


            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-sky-500">
              <input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

           
            <button
              type="submit"
             
              className="transform rounded-sm bg-sky-600 py-2 text-white font-bold duration-300 hover:bg-sky-400"
            >
              Register
            </button>

            <p className="text-center text-lg">
              Already have an account?
              <Link
                href="/Login"  // Use an anchor tag instead of Link
                className="font-medium text-sky-500 underline-offset-4 hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default Page;

"use client";
import React,{useState,useEffect} from "react";
import Post from "@/app/components/Post";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { auth, db } from "../../../../../firebase/config";""
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
const Page = ({ params }) => {
   const [user] = useAuthState(auth);
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "posts"),where("creatorID", "==", params.friendID));
        const data = await getDocs(q);
        const mappedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPost(mappedData);
        console.log("radi" + mappedData);
      } catch (error) {
        console.error("Error fetching food:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Box className="p-1 px-4 flex justify-center items-center font-semibold cursor-pointer rounded-xl text-gray-200 ml-2">
            <CircularProgress />
          </Box>
        </div>
      ) : user ? (
        post.map((post) => (
          <Post key={post.id} post={post}  />
        ))
      ) : (
        <h1 className="flex justify-center text-2xl mt-4 text-white">
          Please log in
        </h1>
      )}
    </div>
  );
};

export default Page;

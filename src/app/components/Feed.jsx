"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import PostCreationForm from "./PostCreationForm";
import Post from "./Post";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Feed = () => {
  const [user] = useAuthState(auth);
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
       
        const q = query(collection(db, "posts"),orderBy("timestamp", "desc"));
        const data = await getDocs(q);
        const mappedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPost(mappedData);
        console.log("radi" + mappedData);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
      setLoading(false);
    };

    getPosts();
  }, []);

  const handleImageUrl = (url) => {
    setImageUrl(url);
    console.log("radi feed" + url);
  };

  const handlePostId = (id) => {
    setPostId(id);
    console.log("radi feed" + id);
  };
  return (
    <div>
      <PostCreationForm onImageUrl={handleImageUrl} onPostId={handlePostId} />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Box className="p-1 px-4 flex justify-center items-center font-semibold cursor-pointer rounded-xl text-gray-200 ml-2">
            <CircularProgress />
          </Box>
        </div>
      ) : (
        post.map((post) => (
          <Post key={post.id} post={post} imageUrl={imageUrl} postId={postId} />
        ))
      )}
    </div>
  );
};

export default Feed;

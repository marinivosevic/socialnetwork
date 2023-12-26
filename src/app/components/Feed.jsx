"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import PostCreationForm from "./PostCreationForm";
import Post from "./Post";

const Feed = () => {
  const [user] = useAuthState(auth);
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState(null); 
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, "posts"));
        const mappedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPost(mappedData);
        console.log("radi" + mappedData);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
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
  }
  return (
    <div>
      <PostCreationForm onImageUrl={handleImageUrl} onPostId = {handlePostId}/>

      {post.map((post) => (
        <Post key={post.id} post={post} imageUrl={imageUrl} postId = {postId}/>
      ))}
    </div>
  );
};

export default Feed;

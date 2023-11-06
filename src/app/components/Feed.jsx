"use client";
import React, { useState,useEffect } from "react";
import { auth, db } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp,getDocs } from "firebase/firestore";
import PostCreationForm from "./PostCreationForm";
import Post from "./Post";

const Feed = () => {
  const [user] = useAuthState(auth);
  const [post, setPost] = useState([]);
 
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(collection(db, "posts"));
        const mappedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) 
        setPost(mappedData);
        console.log("radi" + mappedData);
      } catch (error) {
        console.error("Error fetching food:", error);
      }
    };

    getPosts();
  }, []);
  return (
    <div>
        <PostCreationForm />
        {post.map((post) =>(
            <Post key={(post.id)} post={post}/>
        ))}
    </div>
  );
};

export default Feed;

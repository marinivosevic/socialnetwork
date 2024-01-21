"use client";
import React, { useEffect, useState } from "react";
import { Timestamp } from "../../../firebase/config";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from "@/assets/CommentIcon";
import { auth, db } from "../../../firebase/config";
import Image from "next/image";
import {
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
  FieldValue,
  runTransaction,
  increment,
  get,
  toDate
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const Post = ({ post,imageUrl,postId }) => {
  const [user] = useAuthState(auth);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

 
  useEffect(() => {
    console.log(post);
    const fetchLikeCount = async () => {
      const docRef = doc(db, "posts", post.id);
      const docSnapshot = await getDoc(docRef);
      setLikeCount(docSnapshot.data().likeNumber || 0);
      
    };

    fetchLikeCount(); 
  }, []);  

  const incLikeCountForUser = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==",post.creatorID));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        //console.log(querySnapshot.docs[0]);
        // Update the 'likeNum' field using increment
        await updateDoc(userDocRef, {
          likeNum: increment(1),
        });
      } else {
        console.error("User document not found");
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const incLikeCountForPost = async () => {
    const docRef = doc(db, "posts", post.id); // Replace 'yourCollectionName' with the actual collection name
    try {
      const docSnapshot = await getDoc(docRef);
      const likedByArray = docSnapshot.data().likedBy || [];
      
      // Check if the user has already liked the post
      if (likedByArray.includes(user.uid)) {
        console.log("User already liked the post");
        return;
      }
      
      if (docSnapshot.exists() ) {
        await updateDoc(docSnapshot.ref, {
          likeNumber: increment(1),
          likedBy: arrayUnion(user.uid),
        });
        const updatedDoc = await getDoc(docRef);
        setLikeCount(updatedDoc.data().likeNumber || 0);
        setLiked(true);
      } else {
        console.log("Document not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  return (
    <div>
      <div className="mt-5 rounded-xl border p-5 shadow-md w-full bg-[#0c192e]">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
           {/*  <div className="h-8 w-8 rounded-full bg-slate-400 ">
              <Image className="h-8 w-8 rounded-full bg-slate-400 " src={user.photoURL} width={30} height={30} alt="profile"/>
            </div> */}
            <div className="text-lg font-bold text-slate-200">
              {post.username}
            </div>
          </div>
          <div className="flex items-center space-x-8">
          {post.timestamp?.toDate()?.toLocaleString() || 'No date available'}
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold">{post.title}</div>
          <div className="text-sm text-neutral-100">{post.text}</div>
          <div>
          {(post.imageUrl) && (<Image width="1000" height = "500" src={post.imageUrl} alt="postImage" className="w-full h-96 object-cover  mt-3 rounded-xl" />)}
          </div>
          
        </div>

        <div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-4 md:space-x-8">
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <CommentIcon />
                <span>125</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <button
                  onClick={() => {
                    incLikeCountForUser();
                    incLikeCountForPost();
                  }}
                >
                  {liked ?  <ThumbUpIcon className="pr-1" fontSize="small"  color="primary"/>: <ThumbUpIcon className="pr-1" fontSize="small"  />}
                  
                </button>

                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

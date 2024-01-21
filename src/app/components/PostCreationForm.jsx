"use client";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { images } from "../../../next.config";

const PostCreationForm = ({ onImageUrl, onPostId }) => {
  const [textInput, setTextInput] = useState("");
  const [user] = useAuthState(auth);
  const [titleInput, setTitleInput] = useState("");
  const [image, setImage] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const postId = generateRandomString(12);

  const sendPostToDb = async (e) => {
    console.log(user.id);
    setLoading(true);

    try {
      let imageUrl = null; 

      if (image) {
        // If there is an image, proceed with the upload logic
        const file = image;
        const storage = getStorage();
        const storageRef = ref(storage, file.name);

        // Upload the image
        const [snapshot] = await Promise.all([uploadBytes(storageRef, file)]);

        // Get the download URL after uploading
        imageUrl = await getDownloadURL(storageRef);
      }

  
      const postObject = {
        postId: postId,
        creatorID: user?.uid,
        username: user?.displayName,
        title: titleInput,
        text: textInput,
        timestamp: serverTimestamp(),
        likeNumber: 0,
        likedBy: [],
        imageUrl: imageUrl, // Use the obtained URL if image exists, otherwise null
        creatorID: user?.uid,
      };

     
      const docRef = await addDoc(collection(db, "posts"), postObject);

      toggleForm();
      incPostCountForUser();
      window.location.reload(false);
    } catch (error) {
      console.error("Error uploading or getting image URL:", error);
    } finally {
      setLoading(false);
    }
  };

  const incPostCountForUser = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("id", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        //console.log(querySnapshot.docs[0]);
        // Update the 'likeNum' field using increment
        await updateDoc(userDocRef, {
          numOfPosts: increment(1),
        });
      } else {
        console.error("User document not found");
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {" "}
      <button onClick={toggleForm} className="btn btn-info w-full text-white">
        New Post +
      </button>
      {/* Forma za novi post */}
      {showForm && user && (
        <div className="editor mt-6 mx-auto w-10/12 flex flex-col text-gray-800 border rounded-xl border-gray-300 p-4 shadow-lg max-w-2xl">
          <div className="heading text-center font-bold text-2xl m-5 text-white">
            New Post
          </div>
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
          />
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe everything about this post here"
          ></textarea>

          {/* icons */}
          <div className="icons flex text-gray-500 m-2">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <input
              type="file"
              className="file-input w-full max-w-xs"
              onChange={handleChange}
            ></input>
            <div className="count ml-auto text-gray-400 text-xs font-semibold">
              0/300
            </div>
          </div>
          {/* buttons */}
          <div className="buttons flex">
            <div
              onClick={toggleForm}
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            >
              Cancel
            </div>
            {loading ? (
              <Box className="border border-gray-500 p-1 px-4 font-semibold cursor-pointer rounded-xl text-gray-200 ml-2 bg-blue-500">
                <CircularProgress />{" "}
              </Box>
            ) : (
              <div
                onClick={sendPostToDb}
                className="btn border border-blue-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500"
              >
                Post
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreationForm;

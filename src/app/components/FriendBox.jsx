import React, { useState } from "react";
import { auth, db } from "../../../firebase/config";
import {
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  collection,
  where,
  query,
  getDoc,
  arrayRemove
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';

const FriendBox = ({ friend, page, leaderboardTab }) => {
  const [user] = useAuthState(auth);
  const [areFriendsSuccess, setAreFriendsSuccess] = useState(false);
  const userDocId = [];
  const friendDocId = [];

  const addFriend = async () => {
  
    try {
      const usersRef = collection(db, "users");
      var q = query(usersRef, where("id", "==", user.uid));
      var querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userDocId[0] = doc.id;
        console.log(userDocId[0]);
      });

      const userColRef = doc(db, "users", userDocId[0]);
      await updateDoc(userColRef, { friends: arrayUnion(friend.id) });

      //Add friendship status

      const friendRef = collection(db, "users");
      var q = query(friendRef, where("id", "==", friend.id));
      var querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        friendDocId[0] = doc.id;
      });

      const personColRef = doc(db, "users", friendDocId[0]); // Use person.uid

      await updateDoc(personColRef, { friends: arrayUnion(user.uid) });
      console.log("Friendship added successfully");
      toast.success('Friendship added successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {
          width: '200px', // Set the width to a smaller value
        },
      });
      
      setAreFriendsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFriend = async () => {
    try {
      const usersRef = collection(db, "users");
      var q = query(usersRef, where("id", "==", user.uid));
      var querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userDocId[0] = doc.id;
      });

      const userColRef = doc(db, "users", userDocId[0]);
      await updateDoc(userColRef, {
        friends: arrayRemove(friend.id),
      });

      //Remove friendship status

      const friendRef = collection(db, "users");
      var q = query(friendRef, where("id", "==", friend.id));
      var querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        friendDocId[0] = doc.id;
      });

      const personColRef = doc(db, "users", friendDocId[0]); // Use person.uid

      await updateDoc(personColRef, {
        friends: arrayRemove(user.uid),
      });
      console.log("Friendship removed successfully");
      setAreFriendsSuccess(false);
      toast.success('Friendship removed successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
     
    } catch (error) {
      console.error(error);
    }
  }
  // Renders necesary content based on the page and leaderboard tab
  const renderContent = () => {
    if (page === "friendPage") {
      console.log("URL "+ friend.photoURL)
      return <button onClick={removeFriend} className="btn btn-outline btn-error mb-2">Remove</button>;
     
    }
    if(areFriendsSuccess){
      return <span>Friend added</span>
    }

    switch (leaderboardTab) {
      case "averageLikes":
        return <span>{friend.likeNum / friend.numOfPosts}</span>;

      case "likes":
        return <span>{friend.likeNum}</span>;

      case "posts":
        return <span>{friend.numOfPosts}</span>;

      default:
        return (
          <button className="btn btn-outline btn-info mb-2" onClick={addFriend}>
            Add
          </button>
        );
    }
  };
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
        
         { <Image
            className="w-8 h-8 rounded-full"
            src={friend.photoURL}
            alt="Bonnie image"
            width={50}
            height={50}
          />
         }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {friend.username}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {friend.email}
          </p>
        </div>
        <div>
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default FriendBox;

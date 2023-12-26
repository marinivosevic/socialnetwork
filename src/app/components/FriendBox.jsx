
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
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const FriendBox = ({ friend, page }) => {
  const [user] = useAuthState(auth);
  //const [userDocId, setUserDocId] = useState([]);
  //const [friendDocId, setFriendDocId] = useState(null);
  const [areFriendsSuccess,setAreFriendsSuccess] = useState(false);
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
      await updateDoc(userColRef, { friends: arrayUnion(friend.id)});
     
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
      setAreFriendsSuccess(true); 
    } catch (error) {
      console.error(error);
    }

   
  };
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
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
          <div>
          {page === "friendPage" ? (
              <button
                className="btn btn-outline btn-error mb-2"
               
              >
                Remove
              </button>
            ) : areFriendsSuccess ? (
              <p>Friend</p>
            ) : page === "leaderboardPage" ? (
                <span>{friend.likeNum}</span>
            ) : (
              <button
                className="btn btn-outline btn-info mb-2"
                onClick={addFriend}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendBox;

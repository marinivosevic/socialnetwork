import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import {
  updateDoc,
  arrayUnion,
  doc,getDoc, collection,where
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const AddFriendButton = ({ person }) => {
  const [user] = useAuthState(auth);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const findUserDocumentId = async () => {
      try {
       //TODO naparavi friend relations 
      } catch (error) {
        console.error("Error finding user document ID:", error);
      }
    };

    findUserDocumentId();
  }, [user.uid]);

  const addFriend = async () => {
    try {
      if (userDocId) {
        const userColRef = doc(db, "users", userDocId);
        const personColRef = doc(db, "users", person.id); // Use person.uid
        await updateDoc(userColRef, { friends: arrayUnion(person.id) });
        await updateDoc(personColRef, { friends: arrayUnion(userDocId) });
        console.log("Friendship added successfully");
      } else {
        console.log("User document ID not found. Friendship not added.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={addFriend}>Add</button>
    </div>
  );
};

export default AddFriendButton;
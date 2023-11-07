import React, { useEffect, useState } from "react";
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

const AddFriendButton = ({ person }) => {
  const [user] = useAuthState(auth);
  const [userDocId, setUserDocId] = useState(null);

  
  const addFriend = async () => {
    try {
      //Retrieve user docID 
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("id", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserDocId(doc.id);
      });

      //Retrieve person userID
      const personRef = doc(db, "users", person.id);
      const personDb = await getDoc(personRef);

      //Add friendship status
      const userColRef = doc(db, "users", userDocId);
      const personColRef = doc(db, "users", person.id); // Use person.uid
      await updateDoc(userColRef, { friends: arrayUnion(personDb.data().id) });
      await updateDoc(personColRef, { friends: arrayUnion(user.uid) });
      console.log("Friendship added successfully");
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

"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import FriendBox from "@/app/components/FriendBox";
import { ToastContainer, toast } from "react-toastify";
const Page = () => {
  const [user] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(usersData);
    };

    const fetchUserFriends = async () => {
      if (user) {
        console.log(user.uid);
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("id", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0]?.data();
        const friends = userData?.friends || [];
        setUserFriends(friends);
      }
    };

    fetchUsers();
    fetchUserFriends();
  }, [user]);

  const friends = allUsers.filter((u) => userFriends.includes(u.id));

  return (
    <div>
      {user ? (
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            {friends.map((friend) => (
              <FriendBox key={friend.id} friend={friend} page={"friendPage"} />
            ))}
          </li>
        </ul>
      ) : (
        <h5 className="text-md font-bold flex justify-center  leading-none text-gray-900 dark:text-white">
          Please log in to see your friends
        </h5>
      )}

      { friends.length === 0 && (
        <h5 className="text-md font-bold flex justify-center  leading-none text-gray-900 dark:text-white">
          You have no friends
        </h5>
      )}
    </div>
  );
};

export default Page;

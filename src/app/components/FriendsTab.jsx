"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Link from "next/link";
import FriendBox from "./FriendBox";

const FriendsTab = () => {
  const [user] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(usersData);
      
    };

    const fetchUserFriends = async () => {
      if(user){
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('id', '==', user.uid));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0]?.data();
        const friends = userData?.friends || [];
        setUserFriends(friends);
      }
        
        
    };
    
    fetchUsers();
    fetchUserFriends();
  }, [user]);

  const nonFriends = allUsers.filter((u) => !userFriends.includes(u.id));
  return (
    <div>
      {user ? (
        <div className="flex flex-row justify-end">
          <div className="mr-32">
            <button
              className="btn btn-info text-white"
              onClick={() => auth.signOut()}
            >
              Log out
            </button>
          </div>
          <div className="mr-6 mt-3">
            <h3>{user.displayName}</h3>
          </div>
          <div className="avatar">
            <div className="w-12 justify-right rounded-full ring ring-blue-300 ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} alt={"avatar"} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-end">
          <Link href={"/Login"}>
            {" "}
            <button className="btn btn-info">Log In</button>
          </Link>
        </div>
      )}

      <div className="max-w-2xl mx-auto mt-7">
        <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-[#0c192e] dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Friend suggestions
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View your friends
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-3 sm:py-4">
                {nonFriends.map((friend) => (
                  <FriendBox key={friend.id} friend={friend} />
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsTab;

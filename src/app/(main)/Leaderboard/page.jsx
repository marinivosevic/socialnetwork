"use client"
import React,{useState,useEffect} from 'react'
import { auth } from "../../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection, query, where,orderBy } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import FriendBox from '@/app/components/FriendBox';

const Page = () => {
  const [user] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(query(usersCollection, orderBy('likeNum', 'desc')));
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
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          {friends.map((friend) => (
            <FriendBox key={friend.id} friend={friend} page={"leaderboardPage"} />
          ))}
        </li>
      </ul>
    </div>
  );
};

export default Page;

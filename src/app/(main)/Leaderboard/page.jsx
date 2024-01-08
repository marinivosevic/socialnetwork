"use client";
import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import FriendBox from "@/app/components/FriendBox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Page = () => {
  const [user] = useAuthState(auth);
  const [allUsers, setAllUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [value, setValue] = useState("1");
  const [userFriendsByPost, setUserFriendsByPost] = useState([]);
  const [allUsersByPost, setAllUsersByPost] = useState([]);
  const [usersByAverageLikes, setUsersByAverageLikes] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchUsersOrderByLikes = async () => {
      if(user){
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(
          query(usersCollection, orderBy("likeNum", "desc"))
        );
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const usersWithAverageLikes = usersData.map((user) => ({
          ...user,
          averageLikesPerPost: parseFloat((user.likeNum / user.numOfPosts).toFixed(2)),
        }));
      
        // Sort users by average likes per post
        const sortedUsersByAverageLikes = usersWithAverageLikes.sort(
          (a, b) => b.averageLikesPerPost - a.averageLikesPerPost
        );
      
        setUsersByAverageLikes(sortedUsersByAverageLikes);
        setAllUsers(usersData);
      }
     
    };

    const fetchUserFriendsOrderByLikeNum = async () => {
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

    const fetchUsersOrderByPosts = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(
        query(usersCollection, orderBy("numOfPosts", "desc"))
      );
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsersByPost(usersData);
    };

    const fetchUserFriendsOrderByPosts = async () => {
      if (user) {
        console.log(user.uid);
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("id", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0]?.data();
        const friends = userData?.friends || [];
        setUserFriendsByPost(friends);
      }
    };

    

    fetchUsersOrderByLikes();
    fetchUserFriendsOrderByLikeNum();
    fetchUsersOrderByPosts();
    fetchUserFriendsOrderByPosts();
  }, [user]);

  const friends = allUsers.filter((u) => userFriends.includes(u.id));
  const friendsByPost = allUsersByPost.filter((u) => userFriendsByPost.includes(u.id));
  console.log(friendsByPost);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold  flex justify-center text-gray-900 dark:text-gray-100">
          Leaderboard
        </h1>
      </div>
      <div>
        <Box sx={{ width: "100%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                textColor="action"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Most Total Likes" value="1" />
                <Tab label="Most Average likes per post" value="2" />
                <Tab label="Most Posts" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="py-3 sm:py-4">
                    {friends.map((friend) => (
                      <FriendBox
                        key={friend.id}
                        friend={friend}
                        page={"leaderboardPage"}
                        leaderboardTab={"likes"}
                      />
                    ))}
                  </li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel value="2"> 
            <div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="py-3 sm:py-4">
                    {usersByAverageLikes.map((friend) => (
                      <FriendBox
                        key={friend.id}
                        friend={friend}
                        page={"leaderboardPage"}
                        leaderboardTab={"averageLikes"}
                      />
                    ))}
                  </li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel value="3"><div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li className="py-3 sm:py-4">
                    {friendsByPost.map((friends) => (
                      <FriendBox
                        key={friends.id}
                        friend={friends}
                        page={"leaderboardPage"}
                        leaderboardTab={"posts"}
                      />
                    ))}
                  </li>
                </ul>
              </div></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Page;

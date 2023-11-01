"use client";
import React, { use } from "react";
import Image from "next/image";
import { auth } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const FriendsTab = () => {
  const [user] = useAuthState(auth);
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
         <Link href={"/Login"}> <button className="btn btn-info">Log In</button></Link>
        </div>
      )}

      <div className="max-w-2xl mx-auto mt-7">
        <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-[#0c192e] dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Friends
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li className="py-3 sm:py-4">
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
                      Bonnie Green
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      email@windster.com
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsTab;

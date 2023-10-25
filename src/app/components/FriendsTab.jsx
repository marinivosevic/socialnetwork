import React from "react";
import Image from "next/image";

const FriendsTab = () => {
  return (
    <div >
      <div className="flex flex-row justify-end">
        <div className="mr-6 mt-3">
          <h3>Profile name</h3>
        </div>
        <div className="avatar">
          <div className="w-12 justify-right rounded-full ring ring-blue-300 ring-offset-base-100 ring-offset-2">
            <Image
              src={"/images/stock/photo-1534528741775-53994a69daeb.jpg"}
              width={20}
              height={20}
              alt={"avatar"}
            />
          </div>
        </div>
      </div>

      <div class="max-w-2xl mx-auto mt-7">
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-[#0c192e] dark:border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Friends
            </h3>
            <a
              href="#"
              class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
             
              <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Bonnie Green
                    </p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
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

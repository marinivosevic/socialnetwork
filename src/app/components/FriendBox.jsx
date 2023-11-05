import React from "react";

const FriendBox = ({friend}) => {
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
            email@windster.com
          </p>
        </div>
        <div>
            <button>Add</button>
        </div>
      </div>
    </div>
  );
};

export default FriendBox;

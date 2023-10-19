import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed h-full w-1/4 p-4 flex flex-col border-r-2 border-gray-900">
      <div className=" mb-4 ml-40 ">
        <Image src={"/images/Logo.png"} alt="logo" width={60} height={60} />
      </div>
      <ul className="flex-1 space-y-5 ml-44 mt-20">
        <div>
        <span ><Image src={"/images/home_FILL0_wght400_GRAD0_opsz24.png"} alt="home" width={20} height={20}/></span>
          <li>
            <a href="#" className="text-4xl text-white">
              Home
            </a>
          </li>
        </div>
        <li>
          <a href="#" className="text-4xl text-white">
            Notifications
          </a>
        </li>
        <li>
          <a href="#" className="text-4xl text-white">
            Profile
          </a>
        </li>
        <li>
          <a href="#" className="text-4xl text-white">
            Friends
          </a>
        </li>
        <li>
          <a href="#" className="text-4xl text-white">
            Leaderboard
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

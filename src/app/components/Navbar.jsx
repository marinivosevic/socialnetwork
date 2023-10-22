import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-1/4 p-4  border-r-2 border-gray-900">
      <div>
      
      </div>
      <div className=" mb-4 ml-40 ">
        <Image src={"/images/Logo.png"} alt="logo" width={60} height={60} />
      </div>
      <ul className="flex-1 space-y-5 ml-36 mt-20">
        <div className="flex">
        <span ><Image className="flex mr-2 mt-1" src={"/images/icons8-home-64.png"} alt="home" width={30} height={30}/></span>
          <li>
            <a href="#" className="text-4xl text-white hover:text-gray-400">
              Home
            </a>
          </li>
        </div>
        <div className="flex">
        <span ><Image className="flex mr-2 mt-1" src={"/images/icons8-bell-50.png"} alt="home" width={30} height={30}/></span>
          <li>
            <a href="#" className="text-4xl text-white hover:text-gray-400">
              Notifications
            </a>
          </li>
        </div>
        <div className="flex">
        <span ><Image className="flex mr-2 mt-1" src={"/images/icons8-male-user-50.png"} alt="home" width={30} height={30}/></span>
          <li>
            <a href="#" className="text-4xl text-white hover:text-gray-400">
              Profile
            </a>
          </li>
        </div>
        <div className="flex">
        <span ><Image className="flex mr-2 mt-1" src={"/images/icons8-handshake-heart-50.png"} alt="home" width={30} height={30}/></span>
          <li>
            <a href="#" className="text-4xl text-white hover:text-gray-400">
              Friends
            </a>
          </li>
        </div>
        <div className="flex">
        <span ><Image className="flex mr-2 mt-1" src={"/images/icons8-leaderboard-50.png"} alt="home" width={30} height={30}/></span>
          <li>
            <a href="#" className="text-4xl text-white hover:text-gray-400">
              Leaderboards
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

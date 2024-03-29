import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../components/Navbar";
import FriendsTab from "../components/FriendsTab";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Y - Social Network",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
 
  return (
    <html>
      <body>
        
      
        <div className="flex h-screen justify-center">
        
          <div className="w-1/4  border-r border-gray-800 fixed h-full left-0">
            <Navbar />
          </div>
          <div className=" p-4 overflow-y-auto w-1/2 ">{children}</div>
          <div className="w-1/4 p-4 border-l border-gray-800 fixed h-full right-0">
            <FriendsTab />
          </div>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}

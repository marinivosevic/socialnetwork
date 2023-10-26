import { Inter } from "next/font/google";
import "../globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import FriendsTab from "../components/FriendsTab";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Y - Social Network",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      
      <body>{children}</body>
    </html>
  );
}
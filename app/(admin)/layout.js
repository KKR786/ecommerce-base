import { Inter } from "next/font/google";
import "../globals.css";
import Sidenav from "@/components/navigation/Sidenav";
import Topnav from "@/components/navigation/Topnav";
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  const isLoggedin = cookies().get('token') ? true : false;
  console.log(isLoggedin)
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0"
        />
      </head>
      <body
        className={`${inter.className} antialiased font-sans text-base font-normal bg-slate-900 content`}
      >
        {isLoggedin && <Sidenav />}
        <main className={`relative h-full ${isLoggedin && 'max-h-screen transition-all duration-200 ease-in-out xl:ml-[17rem] rounded-xl'}`}>
        {isLoggedin && <Topnav />}
          {children}
        </main>
      </body>
    </html>
  );
}

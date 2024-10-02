"use client"

import SignInForm from "@/components/form/SignInForm";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Homepage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>

        <div>
          {/* Surrounding div to make image stand out */}
          <div className="p-0.5 border-2 border-gray-300 rounded-full">
            <img 
              src={session.user?.image as string} 
              alt="User profile" 
              className="rounded-full h-20 w-20"
            />
          </div>

          <div>
            <h1 className="text-3xl text-blue-500 font-bold">
              Welcome back, {session.user?.name}
            </h1>
          </div>
          </div>
          <p>{session.user?.email}</p>

          <button onClick={() => signOut()}  className="border border-black rounded-lg px-5 py-1 mt-2 ml-2 ">
            Sign Out
          </button>
        </>
      ) : (
        <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
         <SignInForm/>
        </div>
      )}
    </div>
  );
};

export default Homepage;

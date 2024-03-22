"use client";
import { signIn } from "next-auth/react";

export default function GetStartedBtn() {
  return (
    <button
      onClick={() => signIn()}
      className="bg-dark-blue text-white px-8 py-2 rounded-md hover:bg-opacity-50 active:bg-dark-blue focus:outline-none focus:ring focus:ring-opacity-50"
    >
      Get Started
    </button>
  );
}

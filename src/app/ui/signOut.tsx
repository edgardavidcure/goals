"use client";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
export default function SignOutBtn() {
  return (
    <button
      onClick={() => signOut()}
      className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-light-gray p-3 text-sm font-medium hover:bg-red hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}

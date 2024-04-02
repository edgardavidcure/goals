"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import pageLogo from "../../../../public/logo.png";
import Link from "next/link";
import { Session } from "next-auth";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
interface AuthButtonProps {
  session: Session | null;
}

function AuthButton({ session }: AuthButtonProps) {
  if (session) {
    return (
      <>
        <button
          className="text-white bg-dark-blue w-auto p-2 rounded-lg hover:bg-opacity-50 hover:text-white"
          onClick={() => signOut()}
        >
          <ArrowRightStartOnRectangleIcon className="w-6" />
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          className="text-black w-fit flex bg-extra-light-orange p-2 rounded-lg hover:bg-opacity-50 hover:text-white"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </>
    );
  }
}

function DashboardButton() {
  return (
    <a
      href="/profile"
      className=" text-black  bg-extra-light-orange p-2 rounded-lg  hover:bg-opacity-80"
    >
      Dashboard
    </a>
  );
}

export function Logo() {
  return (
    <Link href={"/"} className="flex items-center justify-center">
      <Image src={pageLogo} alt="Logo" width={80} height={80} />
    </Link>
  );
}

export default function Nav() {
  const { data: session } = useSession();

  return (
    <header className="bg-light-orange col-span-full p-2">
      <nav className="flex justify-between h-full items-center">
        <Logo />
        <div className="flex gap-5 items-center">
          {session && <DashboardButton />}
          <AuthButton session={session} />
        </div>
      </nav>
    </header>
  );
}

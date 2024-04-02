import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { Logo } from "../home/nav";
import SignOutBtn from "../signOut";
import Image from "next/image";
import pageLogo from "../../../../public/logo.png";
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 bg-white lg:w-fit md:px-2">
      <Link
        className="mb-2 flex h-fit items-center justify-center rounded-md bg-light-orange p-4 md:h-40"
        href="/"
      >
        <Image
          src={pageLogo}
          alt="Logo"
          className="w-[60px] h-auto md:w-[100px]"
        />
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-light-gray md:block"></div>
        <SignOutBtn />
      </div>
    </div>
  );
}

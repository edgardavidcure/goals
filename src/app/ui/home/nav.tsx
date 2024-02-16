'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import pageLogo from "../../../../public/logo.png"
import Link from "next/link";
function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		console.log(session);
		return (
			<>
					<button className="text-white" onClick={() => signOut()}>Sign Out</button>
					<p>|</p>
					<a href="/profile">Go to {session?.user?.name}&apos;s Profile</a>
					<p>|</p>
			</>
		);
	} else {
		return (
			<>
					<button className="text-white" onClick={() => signIn() }>Sign In</button>
			</>
		);
	}
}

function Logo(){
    return (
        <Link href={"/"} className="flex items-center justify-center">
            <Image src={pageLogo} alt="Logo" width={80} height={80}/>
        </Link>
    )
}



export default function Nav() {

    return (
        <header className="bg-light-orange col-span-full p-2">
            <nav className="flex justify-between h-full items-center">
                <Logo/>
                <div className="flex gap-5 bg-dark-blue rounded-md p-2 hover:bg-opacity-50">
                    <AuthButton/>
                </div>

            </nav>
        </header>
    )
}
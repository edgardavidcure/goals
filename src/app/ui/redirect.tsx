'use client'
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Redirect(){
    const { data: session } = useSession();
    const router = useRouter()

    if (!session){
        signIn()

    } else (
        router.push(`/dashboard/${session.user?.email}`)

    )
    return null
}
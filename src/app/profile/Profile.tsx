'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import AccountCreation from "../ui/users/accountCreation";
import { useState, useEffect } from 'react';
import DashboardSkeleton from "../ui/skeletons";
import Loader from "../ui/loader";

export default function Profile() {
	const [ userExists, setUserExists ] = useState(Boolean);
	const [ isDataFetched, setIsDataFetched ] = useState({isSet: false});
	const { data: session } = useSession();

	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			try {
                if (session?.user?.email) {
                  const user = await fetch('/api/getUser', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(session?.user?.email)});
                  console.log(user)

                  if (!user.ok) {
                    console.log(isDataFetched)
                    console.log(userExists)
                    setIsDataFetched({ isSet: true });
                    console.log("hello")
                    // setUserExists(false);


                  } else {
                    const response = await user.json();
                    setIsDataFetched({ isSet: true });
                    setUserExists(true);
                    if (response) {
                      router.push(`/dashboard/${response.email}`)
                    }
                  }
                }
              } catch (error) {
                console.error('Failed to fetch user data', error);
                // Handle error appropriately, e.g., redirect or display an error message
              }
		}

		fetchData();
	}, [session]);


    if (session && session.user && typeof session.user.name === 'string' && typeof session.user.email === 'string' && typeof session.user.image === 'string') {
        const { name, email, image } = session.user;
    
        return isDataFetched.isSet ? (
          !userExists && <AccountCreation name={name} image={image} email={email} />
        ) : (
          <div className='w-full flex justify-center items-center mt-20'>
            <Loader/>

          </div>
        );
      } else {
        router.push('/')
      }
    
}
'use client';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import AccountCreation from "../ui/users/accountCreation";
import { useState, useEffect } from 'react';

export default function Profile() {
	const [ userExists, setUserExists ] = useState();
	const [ isDataFetched, setIsDataFetched ] = useState({isSet: false});
	const { data: session } = useSession();

	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			try {
                if (session?.user?.email) {
                  const user = await fetch('/api/getUser', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(session?.user?.email)});
                  if (!user.ok) {
                    console.log(isDataFetched)
                    console.log(userExists)
                    setIsDataFetched({ isSet: true });

                    throw new Error('Failed to fetch user data');

                  } else {
                    const response = await user.json();
                    setIsDataFetched({ isSet: true });
                    setUserExists(response);
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
          userExists ? <h1 className='text-center pt-10'>User Exists</h1> : <AccountCreation name={name} image={image} email={email} />
        ) : (
          <h1 className='text-center pt-10'>Loading...</h1>
        );
      } else {
        return (
          window.location.href = "/"
        );
      }
    
}
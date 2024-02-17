'use client'
import { useEffect, useState } from 'react';

export function UserComponent({ params }: { params: { email: string } }) {
    const [userData, setUserData] = useState<any>(); 
    const userEmail = params.email;
    const decoded = decodeURIComponent(userEmail);
  
    useEffect(() => {
      const getUserData = async () => {
        try {
          const userResponse = await fetch('/api/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(decoded), // Send an object with the email property
          });
  
          if (!userResponse.ok) {
            // Handle non-OK responses, e.g., show an error message
            console.error(`Error fetching user data: ${userResponse.status} - ${userResponse.statusText}`);
            return;
          }
  
          const userData = await userResponse.json();
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      getUserData();
    }, [decoded]);
  

  return (
    <div >
      <h1 className='text-3xl'>My Dashboard</h1>
    </div>
  );
}
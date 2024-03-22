"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../loader";

export function UserComponent({ params }: { params: { email: string } }) {
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const userEmail = params.email;
  const decoded = decodeURIComponent(userEmail);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();

      try {
        const userResponse = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(decoded),
        });

        if (!userResponse.ok) {
          console.error(
            `Error fetching user data: ${userResponse.status} - ${userResponse.statusText}`,
          );
          setUserData(false);
          setLoading(false);
          return;
        }

        const fetchedUserData = await userResponse.json();
        if (session && session.user?.email === decoded) {
          setUserData(fetchedUserData);
        } else {
          setUserData(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(false);
      } finally {
        setLoading(false);
      }
    };

    if (userData === undefined) {
      fetchData();
    }
  }, [decoded, userData]);

  if (loading) {
    // Render a loading state if data is still being fetched
    return true;
  }

  if (!userData) {
    // Redirect to '/' if userData is false or undefined
    router.push("/");
    return null; // You might want to handle the case differently, e.g., show an error message
  }

  // Render the component with the fetched userData
  return (
    <div>
      <h1 className="text-3xl">My Dashboard</h1>
    </div>
  );
}

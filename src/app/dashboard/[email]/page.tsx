'use client'
import { useEffect, useState } from 'react';
import { UserComponent } from '@/app/ui/dashboard/userDashboard';
import { CardWrapper } from '@/app/ui/dashboard/cards';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import DashboardSkeleton from '@/app/ui/skeletons';
import LatestGoals from '@/app/ui/dashboard/latest-goals';
import Footer from '@/app/ui/footer';
export default function Page({ params }: { params: { email: string } }) {
  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setUserEmail(session.user?.email || null);
        setLoading(false); 
      } else {
        redirect("/");
      }
    };

    fetchData();
  }, [session]);

  // if (loading) {
  //   return <DashboardSkeleton />; // Render the loading skeleton while waiting for user data
  // }

  if (userEmail) {
    return (
      <div className='flex flex-col m-5'>
        <UserComponent params={params} />
        <div className="grid gap-6 justify-items-center content-center sm:grid-cols-2 lg:grid-cols-4">
          <CardWrapper userId={userEmail} />
        </div>
        <LatestGoals userId={userEmail}/>
      <Footer/>

      </div>
    );
  }

  return null; 
}
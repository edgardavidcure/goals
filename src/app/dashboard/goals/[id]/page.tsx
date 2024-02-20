'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardSkeleton from '@/app/ui/skeletons';
import Footer from '@/app/ui/footer';
import { GoalComponent } from '@/app/ui/goals/goalComponent';
export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setUserEmail(session.user?.email || null);
        setLoading(false); // Set loading to false once the user email is set
      } else {
        router.push("/");
      }
    };

    fetchData();
  }, [session, router]);

  if (loading) {
    return <DashboardSkeleton />; 
  }

  if (userEmail) {
    return (
      <div className='flex flex-col m-5'>
        <h1 className='text-3xl'>Goal Details</h1>
        <GoalComponent params={params} />
        <Footer/>

      </div>
    );
  }

  return null; // You might want to handle the case when userEmail is null differently
}
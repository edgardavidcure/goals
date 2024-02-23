'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardSkeleton from '@/app/ui/skeletons';
import Footer from '@/app/ui/footer';
import { GoalComponent } from '@/app/ui/goals/goalComponent';
import { Goal } from '@/app/lib/definitions';
import { PlusIcon } from '@heroicons/react/24/outline';
export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<Array<Goal> | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const userId = session?.user?.email || null;
        setUserEmail(userId);
        setLoading(false); 
        const response = await fetch('/api/getAllGoals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( userId ),
        });

        if (!response.ok) {
          throw new Error(`Error fetching goal data: ${response.status} - ${response.statusText}`);
        }

        const goalData = await response.json();
        console.log(goalData)
        setGoals(goalData)
      } else {
        router.push("/");
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return <DashboardSkeleton />; 
  }

  if (!loading) {
    return (
      <div className='flex flex-col m-5 gap-10'>
        
        <h1 className='text-3xl mb-0'>{session?.user?.name} Goals</h1>
        <div className='w-full flex justify-center'>
          <button aria-label='Create Goal' onClick={() => router.push('/dashboard/create')} className='w-fit bg-dark-blue rounded-lg py-4 px-2 text-white flex items-center gap-2 justify-evenly text-sm hover:bg-opacity-80'><PlusIcon className='w-4 text-white'/> Create Goal</button>
        </div>
        {goals ? goals.map((goal) => (
          <GoalComponent params={{id:goal._id}} key={goal._id} />
        )) : <p>No Goals Added Yet</p>}
      </div>
    );
  }

  return null; // You might want to handle the case when userEmail is null differently
}
'use client'
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Goal } from '@/app/lib/definitions';
import GoalStatus from './status';
import Link from 'next/link';
import { GoalSkeleton } from '../skeletons';
import GoalCategory from '../goalCategory';
import { PlusIcon } from '@heroicons/react/24/outline';
export default function LatestGoals({ params }: { params: { email: string } }) {
  const [latestGoals, setLatestGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const userEmail = params.email;
  const email = decodeURIComponent(userEmail);

  useEffect(() => {
    const fetchLatestGoals = async () => {
      try {
        const response = await fetch('/api/getLatestGoals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          console.error(`Error fetching user data: ${response.status} - ${response.statusText}`);
          return;
        }

        const goalsData = await response.json();
        setLatestGoals(goalsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestGoals();
  }, [email]);

  return (
    <div className="flex w-full flex-col my-10 md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Latest Goals</h2>
      <div className="bg-white p-2 rounded-lg">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <GoalSkeleton key={i} />)
        ) : latestGoals.length > 0 ? (
          <div className="flex grow flex-col justify-between rounded-xl bg-extra-light-orange p-4">
            {latestGoals.map((goal, i) => (
              <Link
                key={goal.title}
                href={`/dashboard/goals/${goal._id}`}
                className={clsx('flex flex-col items-center bg-white justify-between p-4 hover:bg-extra-light-orange', {
                  'border-t border-gray': i !== 0,
                })}
              >
                <div className=" w-full">
                  <div className="min-w-0 flex items-center justify-between gap-2 w-full">
                    <p className="truncate text-sm font-semibold md:text-base">{goal.title}</p>
                    <GoalCategory category={goal.categoryId}/>
                  </div>
                </div>
                <div className={`truncate text-sm font-medium md:text-base w-full`}>
                  <GoalStatus status={goal.status} />
                </div>
              </Link>
            ))}
             <div className="flex items-center pb-2 pt-6">
                <ArrowPathIcon className="h-5 w-5 text-black" />
                <h3 className="ml-2 text-sm text-black mb-0 font-extralight italic">Updated just now</h3>
              </div>
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            <p>No Goals Created Yet</p>
            <Link href={'/dashboard/create'}>
              <button aria-label='Create Goal' className='w-fit bg-dark-blue rounded-lg py-4 px-2 text-white flex items-center gap-2 justify-evenly text-sm hover:bg-opacity-80'><PlusIcon className='w-4 text-white'/> Create Goal</button>
            </Link>
          </div>
        )}
      </div>
     
    </div>
  );
}
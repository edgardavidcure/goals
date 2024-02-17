'use client'
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Goal } from '@/app/lib/definitions';
import InvoiceStatus from './status';
import Link from 'next/link';
export default function LatestGoals({ userId }: { userId: string }) {
    const [latestGoals, setLatestGoals] = useState<Goal[]>([]);
  
    useEffect(() => {
      const fetchLatestGoals = async () => {
        try {
            const response = await fetch('/api/getLatestGoals', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userId}),
            });
    
            if (!response.ok) {
              console.error(`Error fetching user data: ${response.status} - ${response.statusText}`);
              return;
            }
    
            const goalsData = await response.json();
            setLatestGoals(goalsData);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      fetchLatestGoals();

      }, [userId]);
  return (
    <div className="flex w-full flex-col my-10 md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Latest Goals
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-extra-light-orange p-4">

        <div className="bg-white px-6">
          {latestGoals.map((goal, i) => {
            console.log(goal)
            return (
              <Link
                key={goal.title}
                href={`/dashboard/goals/${goal._id}`}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {goal.title}
                    </p>
                    <p className="hidden text-sm text-black sm:block">
                      {goal.categoryId}
                    </p>
                  </div>
                </div>
                <p
                  className={` truncate text-sm font-medium md:text-base`}
                >
                  <InvoiceStatus status={goal.status} />
                </p>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-black" />
          <h3 className="ml-2 text-sm text-gray mb-0 font-light ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
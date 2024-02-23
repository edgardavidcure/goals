'use client'
import { useEffect, useState } from 'react';
import { ClockIcon, CheckCircleIcon, RocketLaunchIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import { CardSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const iconMap = {
  Completed: CheckCircleIcon,
  InProgress: RocketLaunchIcon,
  Pending: ClockIcon,
  total: RectangleStackIcon,
};

export function CardWrapper({ params }: { params: {email: string} }) {
  const [cardsData, setCardsData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const userEmail = params.email;
  const email = decodeURIComponent(userEmail);
  const {data: session} = useSession()
  const router = useRouter()

  useEffect(() => {
    const getCardData = async () => {
      try {
        const cardsResponse = await fetch('/api/getCardData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!cardsResponse.ok) {
          console.error(`Error fetching user data: ${cardsResponse.status} - ${cardsResponse.statusText}`);
          return;
        }

        const cardsData = await cardsResponse.json();
        setCardsData(cardsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    getCardData();
  }, [email]);

  if (loading) {
    return <CardsSkeleton />;
  }
  if (email === session?.user?.email){
    return (
      <>
        <Card title="Pending" value={cardsData.totalPendingGoals} type="Pending" />
        <Card title="In Progress" value={cardsData.totalInProgressGoals} type="InProgress" />
        <Card title="Completed" value={cardsData.totalCompletedGoals} type="Completed" />
        <Card title="Total Goals" value={cardsData.totalNumberOfGoals} type="total" />
      </>
    );
  } else {
    router.push(`/dashboard/`)
    return null
  }
}
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'Completed' | 'total' | 'Pending' | 'InProgress';
  }) {
    const Icon = iconMap[type];
    
    return (
      <div className="rounded-xl bg-extra-light-orange p-2 shadow-sm w-full max-w-72">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`truncate rounded-xl bg-white px-4 py-8 text-center text-xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  
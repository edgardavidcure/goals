'use client'
import { useEffect, useState } from 'react';
import { ClockIcon, CheckCircleIcon, RocketLaunchIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import { CardSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

const iconMap = {
  completed: CheckCircleIcon,
  inProgress: RocketLaunchIcon,
  pending: ClockIcon,
  total: RectangleStackIcon,
};

export function CardWrapper({ userId }: { userId: string }) {
  const [cardsData, setCardsData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const cardsResponse = await fetch('/api/getCardData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
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
  }, [userId]);

  if (loading) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <Card title="Pending" value={cardsData.totalPendingGoals} type="pending" />
      <Card title="In Progress" value={cardsData.totalInProgressGoals} type="inProgress" />
      <Card title="Completed" value={cardsData.totalCompletedGoals} type="completed" />
      <Card title="Total Goals" value={cardsData.totalNumberOfGoals} type="total" />
    </>
  );
}
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'completed' | 'total' | 'pending' | 'inProgress';
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
  
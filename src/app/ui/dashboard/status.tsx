import { CheckIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';


export default function GoalStatus({ status }: { status: string }) {
  const goalStatus = {
     pending: 'Pending',
     inProgress: 'InProgress',
     completed: 'Completed',
  };
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
        {
          'bg-gray text-white': status === goalStatus.pending,
          'bg-green text-white': status === goalStatus.completed,
          'bg-yellow text-white': status === goalStatus.inProgress,

        },
      )}
    >
      {status === goalStatus.pending ? (
        <>
        <ClockIcon className="mr-1 w-4 text-white" />
          {goalStatus.pending}
          
        </>
      ) : null}
      {status === goalStatus.completed ? (
        <>
        <CheckIcon className="mr-1 w-4 text-white" />
          {goalStatus.completed}
          
        </>
      ) : null}
      {status === goalStatus.inProgress ? (
        <>
        <RocketLaunchIcon className="mr-1 w-4 text-white" />
          {goalStatus.inProgress}
          
        </>
      ) : null}
    </span>
  );
}

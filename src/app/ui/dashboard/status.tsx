import { CheckIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function GoalStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
        {
          'bg-gray text-white': status === 'ToDo',
          'bg-green text-white': status === 'Completed',
          'bg-yellow text-white': status === 'Doing',

        },
      )}
    >
      {status === 'ToDo' ? (
        <>
        <ClockIcon className="mr-1 w-4 text-white" />
          Pending
          
        </>
      ) : null}
      {status === 'Completed' ? (
        <>
        <CheckIcon className="mr-1 w-4 text-white" />
          Completed
          
        </>
      ) : null}
      {status === 'Doing' ? (
        <>
        <RocketLaunchIcon className="mr-1 w-4 text-white" />
          In Progress
          
        </>
      ) : null}
    </span>
  );
}

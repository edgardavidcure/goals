import { CheckIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
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
          Pending
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'Completed' ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'Doing' ? (
        <>
          In Progress
          <RocketLaunchIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}

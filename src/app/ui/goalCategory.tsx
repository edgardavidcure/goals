import { CheckIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function GoalCategory({ category }: { category: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
        {
          'bg-cblue text-white': category === 'Spiritual',
          'bg-cgreen text-white': category === 'Social',
          'bg-corange text-white': category === 'Intellectual',
          'bg-cpink text-white': category === 'Physical',


        },
      )}
    >
      {category === 'Spiritual' ? (
        <>
          Spiritual
          
        </>
      ) : null}
      {category === 'Social' ? (
        <>
          Social
          
        </>
      ) : null}
      {category === 'Intellectual' ? (
        <>
          Intellectual
          
        </>
      ) : null}
      {category === 'Physical' ? (
        <>
          Physical
          
        </>
      ) : null}
    </span>
  );
}

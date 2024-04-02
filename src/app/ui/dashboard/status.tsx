import {
  CheckIcon,
  ClockIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function GoalStatus({ status }: { status: string }) {
  const goalStatus = {
    pending: "Pending",
    inProgress: "InProgress",
    completed: "Completed",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full py-1 text-xs font-bold w-full",
        {
          // 'bg-gray text-white': status === goalStatus.pending,
          // 'bg-green text-white': status === goalStatus.completed,
          // 'bg-yellow text-white': status === goalStatus.inProgress,
        },
      )}
    >
      {status === goalStatus.pending ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex my-1">
              <ClockIcon className="mr-1 w-4 text-black" />
              <p className="italic font-extralight">Pending</p>
            </div>
            <div className="w-full bg-light-gray rounded-full h-1.5 mb-4">
              <div className={`bg-gray h-1.5 rounded-full w-[10%]`}></div>
            </div>
          </div>
        </>
      ) : null}
      {status === goalStatus.completed ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex my-1">
              <CheckIcon className="mr-1 w-4 text-green" />
              <p className="italic font-extralight">Completed</p>
            </div>
            <div className="w-full bg-light-gray rounded-full h-1.5 mb-4">
              <div className={`bg-green h-1.5 rounded-full w-[100%]`}></div>
            </div>
          </div>
        </>
      ) : null}
      {status === goalStatus.inProgress ? (
        <>
          <div className="flex flex-col w-full">
            <div className="flex my-1">
              <RocketLaunchIcon className="mr-1 w-4 text-yellow" />
              <p className="italic font-extralight">In Progress</p>
            </div>
            <div className="w-full bg-light-gray rounded-full h-1.5 mb-4">
              <div className={`bg-yellow h-1.5 rounded-full w-[50%]`}></div>
            </div>
          </div>
        </>
      ) : null}
    </span>
  );
}

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-light-orange p-2 shadow-sm w-full`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-extra-light-orange" />
        <div className="ml-2 h-6 w-16 rounded-md bg-extra-light-orange text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-extra-light-orange" />
      </div>
    </div>
  );
}
export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative m-9 h-8 w-36 overflow-hidden rounded-md bg-light-orange`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestGoalsSkeleton />
      </div>
    </>
  );
}

export function LatestGoalsSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-light-orange" />
      <div className="flex grow flex-col justify-between rounded-xl bg-light-orange p-4">
        <div className="bg-white px-6">
          <GoalSkeleton />
          <GoalSkeleton />
          <GoalSkeleton />
          <GoalSkeleton />
          <GoalSkeleton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-light-orange" />
            <div className="ml-2 h-4 w-20 rounded-md bg-light-orange" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-extra-light-orange" />
      <div className="rounded-xl bg-extra-light-orange p-4">
        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-light-orange" />
          <div className="ml-2 h-4 w-20 rounded-md bg-light-orange" />
        </div>
      </div>
    </div>
  );
}

export function GoalSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-light-orange py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-light-orange" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-light-orange" />
          <div className="mt-2 h-4 w-12 rounded-md bg-light-orange" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-light-orange" />
    </div>
  );
}

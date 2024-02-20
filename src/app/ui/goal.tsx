import { formatDate } from '@/app/lib/helpers';
import GoalCategory from './goalCategory';
import GoalStatus from './dashboard/status';

export function GoalDisplay(goalData : any){
    const data = goalData.goalData
    const date = formatDate(data.startDate)
    return (
      <div className='flex flex-col w-full'>
          <h1 className='text-3xl mb-2'>{data.title}</h1>
          <hr className='mb-4 text-light-orange' />
          <p className=''>{data.description}</p>
          <div className='flex items-center justify-start gap-2 my-4'>
          <GoalCategory category={data.categoryId}/>
          <GoalStatus status={data.status}/>
          </div>
          <p className='text-gray italic text-sm'>{date}</p>
  
          
      </div>
    )
  }
import { formatDate } from '@/app/lib/helpers';
import GoalCategory from './goalCategory';
import GoalStatus from './dashboard/status';

export function GoalDisplay(goalData : any){
    const data = goalData.goalData
    const date = formatDate(data.createdAt)
    return (
      <div className='flex flex-col w-full'>
          <GoalCategory category={data.categoryId}/>

          <h1 className='text-xl my-1 md:text-xl mb-0 max-w-[70%]'>{data.title}</h1>
          
          <hr className='mb-2 text-light-orange' />
          
          <p className='text-sm'>{data.description}</p>

          <GoalStatus status={data.status}/>
          <p className='text-black italic text-xs font-extralight'>{date}</p>
  
          
      </div>
    )
  }
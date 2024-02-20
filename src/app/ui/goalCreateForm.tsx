'use client'
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Changed from navigation to router



export default function GoalCreateForm() {
  const radioOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'InProgress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  const categoryOptions = [
    { value: 'Physical', label: 'Physical' },
    { value: 'Spiritual', label: 'Spiritual' },
    { value: 'Intellectual', label: 'Intellectual' },
    { value: 'Social', label: 'Social' },
  ];

  const [newGoalValues, setNewGoalValues] = useState<any>({
    title: '',
    categoryId: '',
    description: '',
    startDate: '',
    status: '',
  });

  const router = useRouter();
  const { data: session } = useSession();

  const handleCreateGoal = async () => {
    try {
      const userId = session?.user?.email;
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      const response = await fetch('/api/createGoal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...newGoalValues }),
      });

      if (!response.ok) {
        throw new Error(`Error creating goal: ${response.status} - ${response.statusText}`);
      } else {
        router.push(`/dashboard/${userId}`);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  return (
    <div className='flex flex-col relative gap-10 bg-extra-light-orange w-full py-10 px-6 rounded-xl'>
      <div>
        <h2 className='text-2xl mb-0'>Create a new goal</h2>
        <p className='mt-0 text-gray text-sm'>Set your new goal</p>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='title' className='text-lg font-bold'>Title <span>*</span></label>
        <input
          type='text'
          value={newGoalValues.title}
          onChange={(e) => setNewGoalValues({ ...newGoalValues, title: e.target.value })}
          className='bg-white border border-light-orange text-black text-sm rounded-lg focus:ring-dark-blue focus:border-dark-blue block w-full p-2.5  placeholder:italic placeholder:font-light'
          id='title'
          placeholder='Write your goal title here...'
          required
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="description" className='text-lg font-bold'>Description</label>
        <textarea
          value={newGoalValues.description}
          onChange={(e) => setNewGoalValues({ ...newGoalValues, description: e.target.value })}
          id='description'
          className='block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-light-orange focus:ring-dark-blue focus:border-dark-blue placeholder:italic placeholder:font-light'
          placeholder='Write your goal description here...'
        />
      </div>
      <div>
          <h1 className='text-lg font-bold mb-0'>Status <span>*</span></h1>
          <div className='flex w-40 border p-1 flex-wrap  border-light-orange bg-white rounded-lg md:w-full md:max-w-full  md:justify-evenly'>
            {radioOptions.map((option) => (
              <div key={option.value} className='w-full  p-2 flex items-center md:w-fit hover:bg-extra-light-orange'>
              <input
                type='radio'
                value={option.value}
                checked={newGoalValues.status === option.value}
                onChange={() => setNewGoalValues({ ...newGoalValues, status: option.value })}
                id={option.value}
                className={clsx('w-4 h-4 bg-white border-gray', 
                {
                  'text-green focus:ring-white': option.value === 'Completed',
                  'text-yellow focus:ring-white': option.value === 'InProgress',
                  'text-gray focus:ring-white': option.value === 'Pending',
  
  
  
                },
                )}
                />
                <label  htmlFor={option.value} className='whitespace-nowrap text-sm px-2'>
                  {option.label}
                </label>
                
              </div>
              
            ))}
          </div>
        </div>
  
        <div>
          <h1 className='text-lg font-bold m-0'>Category <span>*</span></h1>
          <div className='flex w-40 border p-1 flex-wrap  border-light-orange bg-white rounded-lg md:w-full md:max-w-full  md:justify-evenly'>
            {categoryOptions.map((option) => (
              <div key={option.value} className='w-full  p-2 flex items-center md:w-fit hover:bg-extra-light-orange'>
                <input
                    type='radio'
                    value={option.value}
                    checked={newGoalValues.categoryId === option.value}
                    onChange={() => setNewGoalValues({ ...newGoalValues, categoryId: option.value })}
                    id={option.value}
                    className={clsx('w-4 h-4 bg-white border-gray', 
                  {
                    'text-cpink focus:ring-white': option.value === 'Physical',
                    'text-cblue focus:ring-white': option.value === 'Spiritual',
                    'text-corange focus:ring-white': option.value === 'Social',
                    'text-cgreen focus:ring-white': option.value === 'Intellectual',
                  },
                  )}
                  />
                <label htmlFor={option.value} className='whitespace-nowrap text-sm px-2'>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      <div className='flex gap-2 m-auto'>
        <button onClick={() => router.push(`/dashboard`)} className='w-fit p-2 rounded-lg bg-gray text-white hover:opacity-80'>Cancel</button>
        <button onClick={() => handleCreateGoal()} className='w-fit p-2 rounded-lg bg-dark-blue text-white hover:opacity-80'>Create Goal</button>
      </div>
    </div>
  );
}
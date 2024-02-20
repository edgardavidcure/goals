'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { GoalDisplay } from '../goal';

import { GoalSkeleton } from '../skeletons';



export function GoalComponent({ params }: { params: { id: string } }) {
  const [goalData, setGoalData] = useState<any>();
  const [action, setAction] = useState('view')
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editedValues, setEditedValues] = useState<any>({
    title: '',
    categoryId: '',
    description: '',
    startDate: '',
    status: '',
  });
  const router = useRouter()
  const goalId = params.id;

  const decoded = decodeURIComponent(goalId);

  const { data: session } = useSession();


  useEffect(() => {
    const getGoalData = async () => {
      try {
        const userId = session?.user?.email;
        if (!userId) {
          throw new Error('User is not authenticated.');
        }

        const response = await fetch('/api/getGoal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goalId, userId }),
        });

        if (!response.ok) {
          throw new Error(`Error fetching goal data: ${response.status} - ${response.statusText}`);
        }

        const goalData = await response.json();
        setGoalData(goalData);
        setEditedValues({
          title: goalData.title,
          categoryId: goalData.categoryId,
          description: goalData.description,
          startDate: goalData.startDate,
          status: goalData.status,
        });
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };

    getGoalData();
  }, [decoded, session]); 



  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDeleteGoal = async () => {
    try {
      const userId = session?.user?.email;
      if (!userId) {
        throw new Error('User is not authenticated.');
      }
  
      const response = await fetch('/api/deleteGoal', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId, userId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error updating goal: ${response.status} - ${response.statusText}`);
      }
  
      setGoalData(null);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };
  
  useEffect(() => {
    // Check if goalData is set to null, and if so, navigate to the desired location
    if (goalData === null) {
      router.push(`/dashboard/${session?.user?.email}`);
    }
  }, [goalData, router, session]);

  return (
    <div>
      {goalData ? (
        <>
           
            <div className='flex relative bg-extra-light-orange w-full py-10 px-6 rounded-xl'>
              <div className='flex gap-2 absolute right-0 top-9 me-4 md:me-6'>
                <button onClick={() => router.push(`/dashboard/goals/${goalId}/edit`)} className='w-9 p-2 rounded-lg md:w-10 hover:bg-light-orange'><PencilIcon/></button>
                <button onClick={openDeleteModal} className='w-9 p-2 rounded-lg md:w-10 hover:bg-red hover:text-white'><TrashIcon/></button>
              </div>
              <GoalDisplay goalData={goalData} />
              {isDeleteModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg">
                    <p className='text-start'>Are you sure you want to delete the goal?</p>
                    <div className="flex justify-end mt-4">
                      <button onClick={handleDeleteGoal} className="mr-2 bg-red text-white px-4 py-2 rounded-lg hover:bg-opacity-80 active:opacity-40">
                        Delete
                      </button>
                      <button onClick={closeDeleteModal} className="bg-gray text-white px-4 py-2 rounded-lg active:bg-opacity-80">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          
        </>
      ) : (
        <GoalSkeleton/>
      )}
    </div>
  );
}
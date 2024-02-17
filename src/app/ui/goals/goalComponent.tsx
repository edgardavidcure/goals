'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Define your GoalComponent
export function GoalComponent({ params }: { params: { id: string } }) {
  // State to store goal data
  const [goalData, setGoalData] = useState<any>();

  // State to store edited values
  const [editedValues, setEditedValues] = useState<any>({
    title: '',
    categoryId: '',
    description: '',
    startDate: '',
    status: '',
  });

  // Get goalId from params
  const goalId = params.id;

  // Decode the goalId if needed
  const decoded = decodeURIComponent(goalId);

  // Get user session
  const { data: session } = useSession();

  // Get the router object

  // Effect to fetch goal data
  useEffect(() => {
    const getGoalData = async () => {
      try {
        // Ensure there is a valid userId in the session
        const userId = session?.user?.email;
        if (!userId) {
          throw new Error('User is not authenticated.');
        }

        // Fetch goal data
        const response = await fetch('/api/getGoal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goalId, userId }),
        });

        // Check for errors in the response
        if (!response.ok) {
          throw new Error(`Error fetching goal data: ${response.status} - ${response.statusText}`);
        }

        // Parse and set goal data
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
        // Handle errors, e.g., show an error message or log to console
        console.error('Error fetching goal data:', error);
      }
    };

    // Call the function to fetch goal data
    getGoalData();
  }, [decoded, session]); // Include decoded and session in the dependency array

  // Function to handle editing the goal
  const handleEditGoal = async () => {
    try {
      // Ensure there is a valid userId in the session
      const userId = session?.user?.email;
      if (!userId) {
        throw new Error('User is not authenticated.');
      }

      // Update the goal with edited values
      const response = await fetch('/api/editGoal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalId, userId, ...editedValues }),
      });

      // Check for errors in the response
      if (!response.ok) {
        throw new Error(`Error updating goal: ${response.status} - ${response.statusText}`);
      }

      // Optionally, update the local goalData with the edited values
      setGoalData({ ...goalData, ...editedValues });
    } catch (error) {
      // Handle errors, e.g., show an error message or log to console
      console.error('Error updating goal:', error);
    }
  };

  // Render the goal data
  return (
    <div>
      {goalData ? (
        <>
          
          {session?.user?.email === goalData.userId ? (
            <>
              <div>
                <h1>Title</h1>
                <input
                  type='text'
                  value={editedValues.title}
                  onChange={(e) => setEditedValues({ ...editedValues, title: e.target.value })}
                />
              </div>
              <div>
                <h2>Description</h2>
                <input
                  type='text'
                  value={editedValues.description}
                  onChange={(e) => setEditedValues({ ...editedValues, description: e.target.value })}
                />
              </div>

              <div>
                <h1>Status</h1>
                <div>
                  <label>
                    <input
                      type='radio'
                      value='Pending'
                      checked={editedValues.status === 'Pending'}
                      onChange={() => setEditedValues({ ...editedValues, status: 'Pending' })}
                    />
                    Pending
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type='radio'
                      value='In Progress'
                      checked={editedValues.status === 'In Progress'}
                      onChange={() => setEditedValues({ ...editedValues, status: 'In Progress' })}
                    />
                    In Progress
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type='radio'
                      value='Completed'
                      checked={editedValues.status === 'Completed'}
                      onChange={() => setEditedValues({ ...editedValues, status: 'Completed' })}
                    />
                    Completed
                  </label>
                </div>
              </div>

              <div>
                <h1>Category</h1>
                <div>
                  <label>
                    <input
                      type='radio'
                      value='Physical'
                      checked={editedValues.categoryId === 'Physical'}
                      onChange={() => setEditedValues({ ...editedValues, categoryId: 'Physical' })}
                    />
                    Physical
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type='radio'
                      value='Spiritual'
                      checked={editedValues.categoryId === 'Spiritual'}
                      onChange={() => setEditedValues({ ...editedValues, categoryId: 'Spiritual' })}
                    />
                    Spiritual
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type='radio'
                      value='Intellectual'
                      checked={editedValues.categoryId === 'Intellectual'}
                      onChange={() => setEditedValues({ ...editedValues, categoryId: 'Intellectual' })}
                    />
                    Intellectual
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type='radio'
                      value='Social'
                      checked={editedValues.categoryId === 'Social'}
                      onChange={() => setEditedValues({ ...editedValues, categoryId: 'Social' })}
                    />
                    Social
                  </label>
                </div>
              </div>


              <button onClick={handleEditGoal}>Save Changes</button>
            </>
          ) :
            <div>
                <h1 className='text-3xl'>{goalData.title}</h1>
                <p className='text-xl'>{goalData.categoryId}</p>
                <p className='text-xl'>{goalData.description}</p>
                <p className='text-xl'>{goalData.startDate}</p>
                <p className='text-xl'>{goalData.status}</p>
            </div>
          }
        </>
      ) : (
        <p>Loading...</p> // Add a loading state
      )}
    </div>
  );
}
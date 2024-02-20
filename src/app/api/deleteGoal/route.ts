import { deleteGoal, getUserByEmail, getGoal } from '@/app/lib/data';
import dbConnect from '@/app/lib/mongodb';
export async function DELETE(
  req: Request,
) {
  try {
    await dbConnect()
    const {goalId, userId} = await req.json()
    const goal = await getGoal(userId, goalId)
    if (goal){
        const process = await deleteGoal(goalId);
        if (process) {
            return new Response(JSON.stringify({ message: 'Goal was deleted.' }),{
              status:200,
              statusText:'OK',
              headers: {
              'Content-Type': 'application/json',
              }
            })
          }
    } else {
        return new Response(JSON.stringify({ message: 'Authentication Error' }),{
            status:500,
            statusText:'INTERNAL SERVER ERROR',
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }
    
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Goal failed to be deleted.' }),{
      status:500,
      statusText:'INTERNAL SERVER ERROR',
      headers: {
      'Content-Type': 'application/json',
      }
  })
}
}

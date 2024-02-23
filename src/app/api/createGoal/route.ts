import { updateGoal, getUserByEmail, getGoal, createGoal } from '@/app/lib/data';
import dbConnect from '@/app/lib/mongodb';
export async function POST(
  req: Request,
) {
  try {
    await dbConnect()
    const date = new Date()
    const {userId, title, description, status, categoryId} = await req.json()
    const user = await getUserByEmail(userId)
    if (user){
        const data = {
            userId: userId,
            title: title,
            categoryId: categoryId,
            description: description,
            status: status,
            createdAt: date
        }
        const process = await createGoal(data);
        if (process) {
            return new Response(JSON.stringify({ message: 'Goal was created.' }),{
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
    return new Response(JSON.stringify({ message: 'Goal failed to be created.' }),{
      status:500,
      statusText:'INTERNAL SERVER ERROR',
      headers: {
      'Content-Type': 'application/json',
      }
  })
}
}

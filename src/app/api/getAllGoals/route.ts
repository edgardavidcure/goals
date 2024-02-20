import { findGoalsByUserId  } from '@/app/lib/data';
import dbConnect from '@/app/lib/mongodb';
export async function POST(req:Request){

	if(req.method !== 'POST'){
		return new Response(JSON.stringify({ message: 'Method Not Allowed' }),{
				status:500,
				statusText:'Internal Server Error',
				headers: {
				'Content-Type': 'application/json',
				}
		});
	}
    const userId = await req.json()
    console.log(userId);

	try{
        await dbConnect()
        
            const data = await findGoalsByUserId(userId)
            return new Response(JSON.stringify(data),{
                status:200,
                statusText:'OK',
                headers: {
                'Content-Type': 'application/json',
                }
        } )
        
        

	} catch(error){
		console.error('Error fetching goal data:', error);
		return new Response(JSON.stringify({ message: 'goals data failed to be fetched.' }),{
				status:500,
				statusText:'INTERNAL SERVER ERROR',
				headers: {
				'Content-Type': 'application/json',
				}
		})
	}
}
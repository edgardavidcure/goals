import { getUserByEmail } from '@/app/lib/data';
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
    const email = await req.json()

	try{
        await dbConnect()

        const user = await getUserByEmail(email)
		if (user){
			return new Response(JSON.stringify(user),{
                status:200,
                statusText:'OK',
                headers: {
                'Content-Type': 'application/json',
                }
        }) 
		} else {
			return new Response(JSON.stringify({message: 'User not found'}),{
                status:404,
                statusText:'NOT FOUND',
                headers: {
                'Content-Type': 'application/json',
                }
        }) 
		}
        
	} catch(error){
		console.error('Error creating product profile:', error);
		return new Response(JSON.stringify({ message: 'Product failed to be created.' }),{
				status:500,
				statusText:'INTERNAL SERVER ERROR',
				headers: {
				'Content-Type': 'application/json',
				}
		})
	}
}
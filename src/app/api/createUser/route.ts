import { createUser, getUserByEmail } from "@/app/lib/data";
import dbConnect from "@/app/lib/mongodb";
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { User } = await req.json();

    const process = await createUser(User);
    if (process) {
      return new Response(JSON.stringify({ message: "User was created." }), {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "User failed to be created." }),
      {
        status: 500,
        statusText: "INTERNAL SERVER ERROR",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

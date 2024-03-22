import { updateGoal, getUserByEmail, getGoal } from "@/app/lib/data";
import dbConnect from "@/app/lib/mongodb";
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { goalId, userId, title, description, status, categoryId } =
      await req.json();
    const data = {
      title: title,
      description: description,
      status: status,
      categoryId: categoryId,
    };
    const goal = await getGoal(userId, goalId);
    if (goal) {
      const process = await updateGoal(goalId, data);
      if (process) {
        return new Response(JSON.stringify({ message: "Goal was updated." }), {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      return new Response(JSON.stringify({ message: "Authentication Error" }), {
        status: 500,
        statusText: "INTERNAL SERVER ERROR",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Goal failed to be updated." }),
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

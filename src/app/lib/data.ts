import { Goal, User } from "./definitions";
import GoalModel from "../models/Goal";
import UserModel from "../models/User"
import { unstable_noStore as noStore } from 'next/cache';
import { CardWrapperProps } from "./definitions";
export async function findGoalsByUserId(userId: string): Promise<Goal[] | null> {
    try {
      const goals = await GoalModel.find({ userId }).exec();
      return goals;
    } catch (error) {
      console.error('Error finding goals by user ID:', error);
      return null;
    }
}

export async function findGoalById(id: string): Promise<Goal | null> {
    try {
      const goal = await GoalModel.findById({ id }).exec();
      return goal;
    } catch (error) {
      console.error('Error finding goals by user ID:', error);
      return null;
    }
}

export async function updateGoal(goalId: string, data: Partial<Goal>): Promise<Goal | null> {
    try {
      const updatedGoal = await GoalModel.findByIdAndUpdate(goalId, data, { new: true });
      return updatedGoal;
    } catch (error) {
      console.error('Error updating goal:', error);
      return null;
    }
}

export async function deleteGoal(goalId: string): Promise<Goal | null> {
    try {
      const deletedGoal = await GoalModel.findByIdAndDelete(goalId);
      return deletedGoal;
    } catch (error) {
      console.error('Error deleting goal:', error);
      return null;
    }
}

export async function createGoal(data: Partial<Goal>): Promise<Goal | null> {
    try {
      const newGoal = await GoalModel.create(data);
      return newGoal;
    } catch (error) {
      console.error('Error creating goal:', error);
      return null;
    }
}

export async function getUserByEmail(userEmail: string): Promise<User | null> {
  noStore();
    try {
        const user = await UserModel.findOne({email: userEmail})
        console.log(user)
        return user
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }
}

export async function createUser(data: Partial<User>): Promise<User | null>{
    try {
        const newUser = UserModel.create(data)
        return newUser
    } catch (error) {
        console.error('Error creating User:', error);
        return null;
    }
}

export async function fetchCardData(userId: string) {
  noStore()

  try {
    const goalsCompletedPromise = getTotalCountGoalsByStatus(userId, 'Completed')
    const goalsPendingPromise = getTotalCountGoalsByStatus(userId, 'ToDo')
    const goalsInProgressPromise = getTotalCountGoalsByStatus(userId, 'Doing')
    const totalNumberOfGoalsPromise = getTotalNumberOfGoals(userId);

    const data = await Promise.all([
      goalsCompletedPromise,
      goalsPendingPromise,
      goalsInProgressPromise,
      totalNumberOfGoalsPromise,
    ]);

    const totalCompletedGoals = Number(data[0] ?? '0');
    const totalPendingGoals = Number(data[1] ?? '0');
    const totalInProgressGoals = Number(data[2] ?? '0');
    const totalNumberOfGoals = Number(data[3] ?? '0');
    


    return {
      totalCompletedGoals,
      totalPendingGoals,
      totalInProgressGoals,
      totalNumberOfGoals
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

async function getTotalCountGoalsByStatus(userId: string, status: string): Promise<number> {
  try {
    // First, check if the user exists
    const user = await UserModel.findOne({ email: userId });
    
    if (!user) {
      console.log(`User with email ${userId} not found.`);
      return 0;
    }

    // Now, retrieve the total completed goals for the user
    const count = await GoalModel.countDocuments({ userId: user.email, status: status });
    console.log(`Total ${status} goals for user ${user.email}: ${count}`);
    return count;
  } catch (err) {
    console.error(err);
    return 0
  }
}

async function getTotalNumberOfGoals(userId: string): Promise<number> {
  try {
    // First, check if the user exists
    const user = await UserModel.findOne({ email: userId });

    if (!user) {
      console.log(`User with email ${userId} not found.`);
      return 0;
    }

    // Now, retrieve the total number of goals for the user
    const count = await GoalModel.countDocuments({ userId: user.email });
    console.log(`Total goals for user ${user.email}: ${count}`);
    return count;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

export async function getLatestGoals(userId: string): Promise<Goal[]> {
  try {
    const userGoals = await GoalModel.find({ userId })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(6); // Limit the result to the latest 6 goals

    if (userGoals.length === 0) {
      throw new Error('No goals found for the user.');
    }

    return userGoals;
  } catch (error) {
    console.error('Error fetching latest goals:', error);
    throw new Error('Failed to fetch latest goals.');
  }
}

export async function getGoal(userId: string, goalId: string) {
  try {
    const user = await UserModel.findOne({ email: userId });

    if (!user) {
      console.log(`User with email ${userId} not found.`);
      return null; 
    }

    const goal = await GoalModel.findOne({ userId: user.email, _id: goalId });

    if (!goal) {
      console.log(`Goal with id ${goalId} not found for user ${user.email}.`);
      return null; 
    }

    console.log(`Found goal for user ${user.email} with id ${goalId}:`, goal);
    return goal;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to get goal.');
  }
}
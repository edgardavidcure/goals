import { Goal, User } from "./definitions";
import GoalModel from "../models/Goal";
import UserModel from "../models/User"
import { unstable_noStore as noStore } from 'next/cache';
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
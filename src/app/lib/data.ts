import { Goal } from "./definitions";
import GoalModel from "../models/Goal";

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
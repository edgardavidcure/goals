import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import { findGoalById, updateGoal, deleteGoal } from '@/app/lib/data';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query: {id} } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const goal = await findGoalById(id as string);
        if (goal !== null) {
            res.status(200).json(goal);
          } else {
            res.status(500).json({ error: 'Internal Server Error' });
          }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
        try {
            const updatedGoal = await updateGoal(id as string, req.body);
            if (updatedGoal !== null) {
              res.status(200).json(updatedGoal);
            } else {
              res.status(404).json({ error: 'Goal not found' });
            }
          } catch (error) {
            console.error('Error updating goal:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
          break;
    case "DELETE":
      try {
        const deletedGoal = await deleteGoal(id as string);
        if (deletedGoal !== null) {
          res.status(200).json({ success: true, message: 'Goal deleted successfully' });
        } else {
          res.status(404).json({ error: 'Goal not found' });
        }
      } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
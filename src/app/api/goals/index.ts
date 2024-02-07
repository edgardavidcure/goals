import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import { findGoalsByUserId, createGoal } from '@/app/lib/data';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query: {userId} } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const goals = await findGoalsByUserId(userId as string);
        if (goals !== null) {
            res.status(200).json(goals);
          } else {
            res.status(500).json({ error: 'Internal Server Error' });
          }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
        try {
            const newGoal = await createGoal(req.body);
            res.status(201).json(newGoal);
          } catch (error) {
            console.error('Error creating goal:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
import { Schema, model } from "mongoose";
import { Goal }  from '../lib/definitions'

const GoalSchema = new Schema<Goal>({
    
        userId: { type: String, required: [true, "Please provide a userId"] },
        title: { type: String, required: [true, "Please provide a goal title"] },
        categoryId: { type: String, required: [true, "Please provide a categoryId"] },
        description: { type: String, required: [true, "Please provide a goal description"] },
        startDate: { type: Date, required: [true, "Please provide a start date"] },
        dueDate: { type: Date, required: [true, "Please provide a due date"] },
        status: { type: String, required: [true, "Please provide a progress status"] },
      },
      { timestamps: true }
    
)

const GoalModel = model<Goal>('Goal', GoalSchema);

export default GoalModel;
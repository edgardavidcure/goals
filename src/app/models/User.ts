import { Schema, model } from "mongoose";
import { User } from "../lib/definitions";
import mongoose from "mongoose";

const UserSchema = new Schema<User>({
  name: { type: String, required: [true, "Please provide a name"] },
  email: { type: String, required: [true, "Please provide an email"] },
  image: { type: String, required: [true, "Please provide a profile picture"] },
});

const UserModel = mongoose.models.User || model<User>("User", UserSchema);

export default UserModel;

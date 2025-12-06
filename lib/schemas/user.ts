import { User } from "@/app/models/User";
import { Schema } from "mongoose";

export const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [2, "Username must be at least 2 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

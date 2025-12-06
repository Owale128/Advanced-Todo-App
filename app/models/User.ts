import { UserSchema } from "@/lib/schemas/user";
import mongoose, { Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);

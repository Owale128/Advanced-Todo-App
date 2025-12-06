import { TodoSchemaModel } from "@/app/models/TodoSchema";
import { Schema } from "mongoose";

export const TodoSchema = new Schema<TodoSchemaModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: [true, "Todo text is required"],
  },
  done: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
    required: true,
  },
  category: {
    type: String,
    default: "General",
    required: true,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

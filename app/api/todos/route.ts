import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TodoModel from "@/app/models/TodoSchema";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const todos = await TodoModel.find({ userId: user.userId }).sort({
      order: 1,
    });

    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.error("Get todos error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, priority, category, dueDate } = await request.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Todo text is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const maxOrderTodo = await TodoModel.findOne({ userId: user.userId })
      .sort({ order: -1 })
      .select("order");

    const newOrder = maxOrderTodo ? maxOrderTodo.order + 1 : 0;

    const todo = await TodoModel.create({
      userId: user.userId,
      text: text.trim(),
      done: false,
      order: newOrder,
      priority: priority || "medium",
      category: category || "General",
      dueDate: dueDate || null,
    });

    return NextResponse.json({ todo }, { status: 201 });
  } catch (error) {
    console.error("Create todo error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { todos } = await request.json();

    if (!Array.isArray(todos)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatePromises = todos.map((todo: { _id: string; order: number }) =>
      TodoModel.findOneAndUpdate(
        { _id: todo._id, userId: user.userId },
        { order: todo.order },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "Order updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

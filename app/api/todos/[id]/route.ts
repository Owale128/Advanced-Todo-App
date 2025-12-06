import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";
import TodoModel from "@/app/models/TodoSchema";
import { UpdateTodoBody } from "@/app/models/UpdateTodoBody";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    let body: UpdateTodoBody = {};
    try {
      const text = await request.text();
      if (text) {
        body = JSON.parse(text);
      }
    } catch (e) {
    }

    const todo = await TodoModel.findOne({
      _id: id,
      userId: user.userId,
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (Object.keys(body).length === 0) {
      todo.done = !todo.done;
    } else {
      if (body.done !== undefined) todo.done = body.done;
      if (body.text !== undefined) todo.text = body.text.trim();
      if (body.priority !== undefined) todo.priority = body.priority;
      if (body.category !== undefined) todo.category = body.category;
      if (body.dueDate !== undefined) todo.dueDate = body.dueDate;
    }

    await todo.save();

    return NextResponse.json({ todo }, { status: 200 });
  } catch (error) {
    console.error("Update todo error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;

    const todo = await TodoModel.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete todo error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

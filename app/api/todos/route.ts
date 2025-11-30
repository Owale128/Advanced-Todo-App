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
      createdAt: -1,
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

    const { text } = await request.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Todo text is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const todo = await TodoModel.create({
      userId: user.userId,
      text: text.trim(),
      done: false,
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

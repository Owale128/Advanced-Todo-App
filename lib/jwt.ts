import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(request: NextRequest): { userId: string; username: string } | null {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      username: string;
    };

    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

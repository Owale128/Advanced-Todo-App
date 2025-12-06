import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const verifyTokenEdge = async (token: string) => {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch (error) {
      return null;
    }
  };

  if (pathname.startsWith("/todo-app")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const user = await verifyTokenEdge(token);

    if (!user) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("token");
      return response;
    }

    return NextResponse.next();
  }

  if (pathname === "/" || pathname === "/registrera") {
    if (token) {
      const user = await verifyTokenEdge(token);

      if (user) {
        return NextResponse.redirect(new URL("/todo-app", request.url));
      } else {
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/registrera", "/todo-app/:path*"],
};

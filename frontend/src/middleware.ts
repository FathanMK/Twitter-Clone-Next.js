import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("token");
  const response = await fetch(
    "http://localhost:8008/api/v1/user/verify-token",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  if (url.startsWith("/home")) {
    if (response.status === 403) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (url.startsWith("/login")) {
    if (response.status === 200) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (url.startsWith("/register")) {
    if (response.status === 200) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/home", "/login", "/register"],
};

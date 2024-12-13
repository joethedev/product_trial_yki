import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedIn = Boolean(request.cookies.get("accessToken")?.value);

  if (loggedIn) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  } else {
    if (request.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

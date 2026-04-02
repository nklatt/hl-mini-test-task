import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUserTokenFromRequest } from "./utils/getUserToken";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect root to /courses
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  // Protect all (with_user) routes — check JWT presence
  if (pathname.startsWith("/courses") || pathname.startsWith("/admin")) {
    const userToken = await getUserTokenFromRequest(request);
    if (!userToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

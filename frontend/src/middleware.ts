import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserData } from "./lib/axios/api/users";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = await getCurrentUserData(token);
    if (response === null || !response.success) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

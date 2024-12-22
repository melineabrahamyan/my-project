import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { pageUrls, publicPaths } from "./lib/pageUrls";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  const token = request.cookies.get("accessToken")?.value;
  const dynamicPublicPathsRegex = new RegExp(
    `^(${publicPaths.join("|")})(/[^/]+)?$`
  );

  if (!token && !dynamicPublicPathsRegex.test(pathname)) {
    request.nextUrl.pathname = pageUrls.adminSignIn;
    return NextResponse.redirect(request.nextUrl);
  }

  if (token && pathname === pageUrls.adminSignIn) {
    request.nextUrl.pathname = pageUrls.dashboard;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

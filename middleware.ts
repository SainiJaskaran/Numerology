import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  // Always allow access to the login page
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  // For all other /admin routes, require the admin_access cookie
  const hasAccess = request.cookies.get("admin_access")?.value === "granted"
  if (hasAccess) {
    return NextResponse.next()
  }

  // No valid access — redirect to login
  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = "/admin/login"
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}

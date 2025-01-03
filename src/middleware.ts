import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Đường dẫn yêu cầu người dùng đã đăng nhập
const privatePaths = ["/dashboard", "/profile", "/"];

// Đường dẫn chỉ dành cho người dùng chưa đăng nhập
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Lấy đường dẫn hiện tại
  const accessToken = request.cookies.get("token")?.value; // Lấy token từ cookie

  // Nếu người dùng chưa đăng nhập
  if (!accessToken) {
    // Cho phép truy cập các authPaths
    if (authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }
    // Chặn truy cập vào các privatePaths
    if (privatePaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Nếu người dùng đã đăng nhập
  if (accessToken) {
    // Chặn truy cập vào authPaths
    if (authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Cho phép truy cập nếu không vi phạm điều kiện nào
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
  // Matcher áp dụng middleware cho tất cả các route ngoại trừ các route không cần kiểm tra
};
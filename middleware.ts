export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/contracts/:path*", "/proposals/:path*", "/training/:path*"],
};

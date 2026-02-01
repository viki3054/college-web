import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      if (!pathname.startsWith("/dashboard")) return true;
      if (!token?.uid) return false;

      if (pathname.startsWith("/dashboard/admin")) return token.role === "ADMIN";
      if (pathname.startsWith("/dashboard/teacher")) return token.role === "TEACHER";
      if (pathname.startsWith("/dashboard/parent")) return token.role === "PARENT";
      if (pathname.startsWith("/dashboard/student")) return token.role === "STUDENT";
      if (pathname.startsWith("/dashboard/bus")) {
        const perms = token.permissions || [];
        return token.role === "ADMIN" || (Array.isArray(perms) && perms.includes("BUS_STAFF"));
      }

      // /dashboard root is allowed for any logged-in role
      return true;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};

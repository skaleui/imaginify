import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  debug:true,
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
  ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
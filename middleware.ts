import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix
} from "@/routes"
const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req // destruct next url
  const isLoggedIn = !!req.auth //check if user is logged in

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute  = authRoutes.includes(nextUrl.pathname)


  if (isApiAuthRoute) { 
    return null
  }

  // if login is true redirect to settings page
  // if login false return null
  if (isAuthRoute) { 
    if (isLoggedIn) { 
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  // if does login or use public route then redirect to search nextUrl to get /auth/login?callbackUrl
  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = nextUrl.pathname;
    if (nextUrl.search) { 
      callBackUrl = nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callBackUrl)

    return Response.redirect(new URL(
      `/auth/login?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ))
  }
  return null

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
} 
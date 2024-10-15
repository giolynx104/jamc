import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // If the user is not logged in, redirect to the signin page
  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // // If the session is available, redirect to the onboarding page
  // if (session && session.user) {
  //   return NextResponse.redirect(new URL('/onboarding', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

import { NextRequest, NextResponse } from 'next/server'

export { auth as middleware } from 'auth'

// Or like this if you need to do something here.
export function proxy(request: NextRequest) {
    return NextResponse.redirect(new URL('/home', request.url))
}
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

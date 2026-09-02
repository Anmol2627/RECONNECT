import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/verify-email') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (user && !request.nextUrl.pathname.startsWith('/auth')) {
    const role = user.user_metadata.role || 'participant'
    
    // If organization tries to access participant pages
    if (role === 'organization' && !request.nextUrl.pathname.startsWith('/org')) {
      const url = request.nextUrl.clone()
      url.pathname = '/org/dashboard'
      return NextResponse.redirect(url)
    }

    // If participant tries to access org pages
    if (role === 'participant' && request.nextUrl.pathname.startsWith('/org')) {
      const url = request.nextUrl.clone()
      url.pathname = '/journey'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

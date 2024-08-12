import {isLoggedIn} from '../utils/auth'
export async function middleware(request) {
  const currentUser = await isLoggedIn()
  const path = request.nextUrl.pathname;
  const allowedPaths = ['/login', '/signup']
  if (currentUser && !path.startsWith('/')) { 
    return Response.redirect(new URL('/', request.url))
  }
 
  if (!currentUser && !allowedPaths.some(p=>path.startsWith(p))) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
// export const config = {
//   matcher: ['/login'],
// }
import { isLoggedIn } from './utils/auth';

export async function middleware(request) {
  const currentUser = await isLoggedIn(); // Assume this returns user data or null/false
  const path = request.nextUrl.pathname;

  const allowedPaths = ['/login', '/signup'];

  if (currentUser && allowedPaths.includes(path)) {
    return Response.redirect(new URL('/', request.url));
  }

  if (!currentUser && !allowedPaths.includes(path)) {
    return Response.redirect(new URL('/login', request.url));
  }
console.log(currentUser)
  return; 
}

"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter,usePathname } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn } from "@/utils/auth.js";
import {Provider} from "react-redux"
import {store} from "@/redux/store"
import { Loader } from "@/components/loader/Loader";
import { useCurrentUser } from "@/service/userService";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { PrimeReactProvider } from 'primereact/api';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const pathName = usePathname()
 
  useEffect(() => {
    const isUserValid=async()=>{
      let allowed = ['/signup']
       if(!await isLoggedIn() && !allowed.includes(pathName)){
          router.push("/login")
      }
      // fetch current user data
      if(await isLoggedIn()){
        const res =await useCurrentUser()
        store.dispatch(setCurrentUser(res))
      }
    }
    isUserValid()
  }, []);
  const queryClient = new QueryClient()
  return (
    
    <html lang="en">
     <Provider store={store}>
      <QueryClientProvider client={queryClient}>
       <body className={inter.className}>
        <PrimeReactProvider>
            <Loader/>
            {children}
        </PrimeReactProvider>
       </body>
      </QueryClientProvider>
     </Provider>
    </html>
  );
}

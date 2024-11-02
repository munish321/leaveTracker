"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Loader } from "@/components/loader/Loader";
import { currentUserData } from "@/service/userService";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const isUserValid = async () => {
      let allowed = ["/signup", "/login"].includes(pathName);
      let user = null;
      if (!allowed) {
        user = await currentUserData();
      }
      if (!user?.data.auth && !allowed) {
        router.push("/login");
      } else if (user?.data.auth) {
        store.dispatch(setCurrentUser(user.data.data));
      }
    };
    isUserValid();
  }, []);

  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <body className={inter.className}>
            <PrimeReactProvider>
              <Loader />
              {children}
            </PrimeReactProvider>
          </body>
        </QueryClientProvider>
      </Provider>
    </html>
  );
}

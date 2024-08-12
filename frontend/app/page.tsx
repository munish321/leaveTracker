"use client"
import { Button } from "@/components/ui/button";
import { logOut } from "@/utils/auth";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const handleLogout = () => {
    logOut();
    router.push("/login")
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <h1>This will be the home page after we completed login process</h1>
       <Button onClick={handleLogout}>Logout</Button>
    </main>
  );
}

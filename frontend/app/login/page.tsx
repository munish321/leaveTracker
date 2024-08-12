"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/api.js";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import {isLoggedIn, setAuthentication} from '../../utils/auth'
export default function page() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = () => {
    axiosInstance.post("/login", {email:login.email,password:login.password }).then((res) => {
      if(res.status===201){
          setAuthentication(res.data.token)
          debugger
          if(res.data.data.role==="ADMIN"){
             router.push("/admindashboard")
             return;
          }
          router.push("/")
      }
    });
  }

  useEffect(() => {
    const isUserValid=async()=>{
       if(await isLoggedIn()){
        router.push("/")
       }else{
        router.push("/login")
       }
    }
    isUserValid()
  }, []);
  return (
    <>
      <main className="flex h-screen">
        <section className="flex basis-[70%] w-full items-center justify-center">
          <div className="w-[350px] shadow-sm rounded-md bg-slate-100 px-[20px] py-[30px]">
            <div className="text-2xl text-[#0c0d0e] font-bold text-center mb-[10px]">Login</div>
            <div className="mb-[10px] flex flex-col ">
              <label htmlFor="email" className="mb-[5px] font-normal">E-Mail</label>
              <Input
              className="outline-none border-0 ring-0 focus-visible:ring-0 border-[#d9d9d9]"
                placeholder="email"
                id="email"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
            </div>
            <div className="mb-[10px] flex flex-col ">
              <label htmlFor="password" className="mb-[5px] font-normal">Password</label>
              <Input
              className="outline-none border-0 ring-0 focus-visible:ring-0 border-[#d9d9d9]"
                placeholder="password"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
            </div>
            <Button className="w-full mt-2" onClick={handleLogin}>Login</Button>
          </div>
        </section>
        <section className="flex basis-[30%] justify-center items-center p-[10px] bg-[#6EACDA]">
          <Button className="px-[40px] rounded-[14px]" onClick={()=>router.push("/signup")}>Signup</Button>
        </section>
      </main>
    </>
  );
}

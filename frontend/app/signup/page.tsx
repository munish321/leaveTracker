"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { axiosInstance } from "../../utils/api.js";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
export default function page() {
  const [login, setLogin] = useState({
    name:"",
    email: "",
    password: ""
  });
  const { toast } = useToast()
  const router = useRouter()
  const handleSignup = () => {
    axiosInstance.post("/signup", { ...login }).then((res) => {
        if(res.status===201){
          toast({
            description: res.data.message,
          })
          setLogin({ email:"",password:"",name:'' })
          router.push("/login")
         }else{
          toast({
            description: 'res.data.message',
          })
         }
    }).catch((err)=>{
      toast({
        description: err.response.data.message,
      })
    });
  };
  return (
    <>
      <main className="flex h-screen">
        <section className="flex basis-[30%] justify-center items-center p-[10px] bg-[#6EACDA]">
          <Button className="px-[40px] rounded-[14px]" onClick={()=>router.push('/login')}>Login</Button>
        </section>
        <section className="flex basis-[70%] w-full items-center justify-center">
          <div className="w-[350px] shadow-sm rounded-md bg-slate-100 px-[20px] py-[30px]">
            <div className="text-2xl text-[#0c0d0e] font-bold text-center mb-[10px]">SignUp</div>
            <div className="mb-[10px] flex flex-col ">
              <label htmlFor="email" className="mb-[5px] font-normal">Name</label>
              <Input
              className="outline-none border-0 ring-0 focus-visible:ring-0 border-[#d9d9d9]"
                placeholder="Name"
                id="name"
                onChange={(e) => setLogin({ ...login, name: e.target.value })}
              />
            </div>
            <div className="mb-[10px] flex flex-col ">
              <label htmlFor="email" className="mb-[5px] font-normal">E-Mail</label>
              <Input
              className="outline-none border-0 ring-0 focus-visible:ring-0 border-[#d9d9d9]"
                placeholder="E-Mail"
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
            <Button className="w-full mt-2" onClick={handleSignup}>Signup</Button>
          </div>
        </section>
      </main>
    </>
  );
}

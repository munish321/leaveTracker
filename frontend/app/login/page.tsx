"use client";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/api.js";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import {isLoggedIn, setAuthentication} from '../../utils/auth'
import { currentUserData } from '@/service/userService';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/redux/slices/userSlice';

export default function page() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogin = () => {
    axiosInstance.post("/login", {email:login.email,password:login.password }).then(async(res) => {
      if(res.status===201){
          setAuthentication(res.data.token)
          const loggedIn = await currentUserData();
          dispatch(setCurrentUser(loggedIn.data.data));
          router.push("/")
      }else{
        // toast({
        //   description: res.data.message,
        // })
      }
    }).catch((err)=>{
      console.log(err.response.data.message)
      toast({
        description: err.response.data.message,
        duration: 5000,
        variant: "destructive", // Use an appropriate variant for errors
      });
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
      <main className="flex h-screen bg-[url('/login-bg.jpg')] bg-center bg-no-repeat bg-cover">
        <section className="flex w-full items-center ml-[15%]">
          <div className="w-[350px] shadow-xl rounded-xl px-[20px] pt-[30px] pb-[10px]">
            <div className="text-2xl text-[var(--light-bg-color)] font-bold text-center mb-[20px]">Login</div>
            <div className="mb-[10px] flex flex-col ">
              <label htmlFor="email" className="mb-[5px] text-white font-normal">E-Mail</label>
              <InputText
              className="!h-[40px] !border-0"
                placeholder="email"
                id="email"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
            </div>
            <div className="mb-[10px] flex flex-col ">
              <label htmlFor="password" className="mb-[5px] text-white font-normal">Password</label>
              <InputText
              className="!h-[40px] !border-0"
                placeholder="password"
                type='password'
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
            </div>
            <Button className="w-full mt-[40px]" onClick={handleLogin}>Login</Button>
            <Button className="px-[40px] mt-[20px] !bg-transparent border border-transparent hover:border-white w-full rounded-[14px]" onClick={()=>router.push("/signup")}>Signup</Button>
          </div>
        </section>
      </main>
    </>
  );
}

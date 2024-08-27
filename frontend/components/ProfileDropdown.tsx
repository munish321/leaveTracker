"use client"
import React, { useState,useEffect } from 'react'
import { useRouter } from "next/navigation";
import { logOut } from "@/utils/auth";
import Link from 'next/link';
import { DialogBox } from './Dialogs/ProfileDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ProfileDropdown=()=>{
  const router = useRouter()
  const [visible,setVisible] = useState(false)
  const handleLogout = () => {
    logOut();
    router.push("/login")
  }
  useEffect(() => {
      
  },[])
  const handle = () => {
    setVisible(!visible)
  }
  return (<>
  <DialogBox visible={visible} onClose={handle}/>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <div className='flex items-center cursor-pointer'>
           <img src="/profile.jpg" className='w-[40px] '/>
           <i className="fa-solid fa-caret-down"></i>
         </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/admindashboard"}>
        <DropdownMenuItem className='cursor-pointer '>
            Admin Dashboard
          </DropdownMenuItem>
        </Link>
          <DropdownMenuItem className='cursor-pointer' onClick={handle}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            Settings
          </DropdownMenuItem>
          
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}

"use client"
import { useState,useRef } from 'react'
import type { MouseEvent } from 'react';
import { useRouter } from "next/navigation";
import { logOut } from "@/utils/auth";
import Link from 'next/link';
import { DialogBox } from './Dialogs/ProfileDialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { UrlObject } from 'url';
import { redirect } from 'next/navigation';
interface IItems{
  name: string
  to?:UrlObject | string
  code:string
  command?:(e:any,item:IItems)=>void
}
export const ProfileDropdown=()=>{
  const router = useRouter()
  const [visible,setVisible] = useState(false)
  const op: any = useRef(null);
  const cities:IItems[] = [
      { name: 'Admin Dashboard', code: 'adminDashboard', to:"/dashboard/admin" },
      { name: 'Profile', code: 'profile', command:()=>handle() },
      { name: 'Log out', code: 'logout', command:()=>handleLogout() },
  ];
  const handleLogout = () => {
    logOut();
    redirect("/login")
    // router.push("/login")
  }
  const handle = () => {
    setVisible(!visible)
  }
  const handleProfileItemClick =(e:MouseEvent,item:IItems)=>{
    op.current.toggle(e)
    item.command && item.command(e,item)
  }
  return (
  <>
    <DialogBox visible={visible} onClose={handle}/>
    {/* image is for toggling profile menu dropdown */}
    <img onClick={(e) => op.current.toggle(e)} src="/profile.jpg" className='w-[40px] rounded-full cursor-pointer' />
    <OverlayPanel ref={op}>
      {
      cities.map((item,index)=>(
        <Link href={item.to ?? ""} key={index}>
        <li onClick={(event)=>handleProfileItemClick(event,item)} className='list-none hover:bg-blue-200 p-2 rounded-sm min-w-[200px] cursor-pointer'>
          <span>{item.name}</span>
        </li>
        </Link>
      ))
      }
    </OverlayPanel>
  </>)
}

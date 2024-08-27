import React from 'react'
import { SideBar } from '@/components/SideBar'
import { Input } from "@/components/ui/input"
import { ProfileDropdown } from '@/components/ProfileDropdown'
import { Separator } from "@/components/ui/separator"
import { TopBar } from '@/components/TopBar'

export const AdminLayout=({children}:any)=> {
  const sideBarList:any= [
     {
      icon:'fa-solid fa-house',
      label:'Home',
      to:'/'
     },
     {
      icon:'fa-solid fa-house',
      label:'Atendence & Leave',
      to:'/leave'
     },
     {
      icon:'fa-solid fa-house',
      label:'Dashboard',
      to:'/'
     },
  ]
  return <>
  <div className='flex w-full h-screen overflow-hidden'>
     {/* <section className='basis-[20%] bg-[#f5f4f6] shadow-sm'>
       <nav>
          <SideBar items={sideBarList}/>
       </nav>
     </section> */}
     <section className='w-full '>
      <div className='py-2 px-3 flex justify-between'>
         <div>
         <TopBar items={sideBarList} />
         </div>
         <div className='flex'>
         <Input type="text" placeholder="Search"  />
         <ProfileDropdown />
         </div>
      </div>
      <Separator />
      <div className='px-3'>
      {children}
      </div>
     </section>
  </div>
  </>
}
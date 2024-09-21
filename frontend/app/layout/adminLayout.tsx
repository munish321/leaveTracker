import React from 'react'
import { Input } from "@/components/ui/input"
import { ProfileDropdown } from '@/components/ProfileDropdown'
import { Separator } from "@/components/ui/separator"
import { TopBar } from '@/components/TopBar'
import {sideBarList} from "@/utils/constants"

export const AdminLayout=({children}:any)=> {
  return <>
  <div className='flex w-full h-screen overflow-hidden'>
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
import React from 'react'
import { SideBar } from '@/components/SideBar'
export const AdminLayout=({children}:any)=> {
  const sideBarList:any= [
     {
      icon:'fa-solid fa-house',
      label:'Dashboard'
     },
     {
      icon:'fa-solid fa-house',
      label:'Atendence & Leave'
     },
     {
      icon:'fa-solid fa-house',
      label:'Dashboard'
     },
  ]
  return <>
  <div className='flex w-full h-screen'>
     <section className='basis-[20%] bg-[#f5f4f6] shadow-sm'>
       <nav>
          <SideBar items={sideBarList}/>
       </nav>
     </section>
     <section className='basis-[80%] bg-green-300'>
      {children}
     </section>
  </div>
  </>
}
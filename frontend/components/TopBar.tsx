import React from 'react'
import Link from 'next/link'
import { Menubar } from 'primereact/menubar';
 interface TopBarProps{
  items:Array<TopBarItem>
}
interface TopBarItem{
  label:string
  url:string
}
export const TopBar=({items}:TopBarProps)=>{

  return (
    <div className='flex items-center'>
      <Link href={"/"}>
      <img className='w-[120px] mr-[50px] cursor-pointer' src='/vercel.svg' /> 
      </Link>
      <Menubar model={items} />  
      {/* {
        items.map((item,index)=>(
          <Link href={item.url} className='py-2 px-4 hover:bg-[#f4f8ff] hover:text-primaryColor bg-transparent font-semibold  text-primaryTextColor' key={index}>{item.label}</Link>
        ))
      } */}
    </div>
  )
}


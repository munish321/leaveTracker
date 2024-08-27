import React from 'react'
import Link from 'next/link'
 interface TopBarProps{
  items:Array<TopBarItem>
}
interface TopBarItem{
  label:string
  to:string
}
export const TopBar=({items}:TopBarProps)=>{

  return (
    <div className='flex items-center'>
      <Link href={"/"}>
      <img className='w-[120px] mr-[50px] cursor-pointer' src='/vercel.svg' /> 
      </Link>
      {
        items.map((item,index)=>(
          <Link href={item.to} className='py-2 px-4 hover:bg-[#f4f8ff] hover:text-primaryColor bg-transparent font-semibold  text-primaryTextColor' key={index}>{item.label}</Link>
        ))
      }
    </div>
  )
}


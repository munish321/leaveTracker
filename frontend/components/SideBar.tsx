import React from 'react'
interface SideBarProps{
  items:[{
    icon?:string
    label:string
  }]
}
export const SideBar=({items}:SideBarProps)=>{
  return (
    <ul className=''>
      {
        items.map((item,index)=>{
          return (
            <li className=' p-2 w-full cursor-pointer hover:bg-[#bdbdbd]' key={index}>
              <i className={item.icon}></i>
              <span className='text-[#283564] font-bold'>{item.label}</span>
            </li>
          )
        })
      }
    </ul>
  )
}
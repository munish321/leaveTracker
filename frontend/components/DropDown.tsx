"use client"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { string } from 'yup'

interface Item{
  code:string
  value:string
}
interface Props{
  placeholder?:string
  showLabel?:boolean
  options:Array<Item>
  onSelect:(e:{code:string,value:string})=>void

}
interface MenuItemsProps{
  items:Array<Item>
}


export const Dropdown=({placeholder="",showLabel=false,options=[],onSelect}:Props)=>{
  const [selectedValue,setSelectedValue] = useState({value:placeholder,code:''})
  const handleSelectedValue=(item:Item)=>{
    setSelectedValue(item)
    onSelect(item)
  }
  const MenuItems = ({items}:MenuItemsProps) => {
    return <>
    {
      items.map((item,index)=>(
        <DropdownMenuItem key={index} onClick={()=>handleSelectedValue(item)} className='cursor-pointer '>
          {item.value}
        </DropdownMenuItem>
      ))
    }
    </>
  }
  return (<>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <div className='flex items-center cursor-pointer'>
           <img src="/profile.jpg" className='w-[40px] '/>
           <span>{selectedValue.value}</span>
           <i className="fa-solid fa-caret-down"></i>
         </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {showLabel && <DropdownMenuLabel>My Account</DropdownMenuLabel>}
        <MenuItems items={options} />
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}

import React from 'react'
import Link from 'next/link'
import { BreadComponent } from './BreadComponent';
import { InputText } from 'primereact/inputtext';
import { ProfileDropdown } from './ProfileDropdown';


export const TopBar=()=>{

  return (
    <div className="flex items-center justify-between bg-white">
          <div className="flex items-center px-[10px] gap-[122px] py-[8px] ">
            <Link href={"/"}>
              <img className="w-[100px] cursor-pointer" src="/vercel.svg" />
            </Link>
            <BreadComponent />
          </div>
          <span className="flex items-center">
            <InputText placeholder="Search" />
            <ProfileDropdown />
          </span>
        </div>
  )
}


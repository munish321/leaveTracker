"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface IProps {
  trigger:React.ReactElement
  value:Date | undefined
  handleChange:(value:Date | undefined)=>void
}
export function DatePicker({trigger,value,handleChange}:IProps) {
  const [date, setDate] = React.useState<Date | undefined>()
  const handleSelect = (val:Date | undefined)=>{
    setDate(val)
    handleChange(val)
    value = val
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface SelectFieldProps {
  value:string
  onChange:(e:string)=>void,
  placeHolder?:string,
  defaultValue?:string,
  items:Array<{
    label?:string,
    list:Array<{
      text:string,
      value:string
    }>
  }>
}
  // Set default props
  SelectField.defaultProps = {
    placeHolder: "Default placeholder",
    defaultValue: "null",
    items:[]
  };
export function SelectField({value,onChange,placeHolder,defaultValue,items}:SelectFieldProps) {

  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={(e)=>onChange(e)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        {
          items.map((item,index)=>{
            return <>
             <SelectGroup key={index}>
             <SelectLabel>{item.label}</SelectLabel>
             {
              item.list.map((o,i)=>{
                return <SelectItem key={i} value={o.value}>{o.text}</SelectItem>
              })
             }
             </SelectGroup>
            </>
          })
        }
      </SelectContent>
    </Select>
  )
}

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from "@/components/ui/button";
interface Props{
  visible:boolean,
  header?:React.ReactNode
  content?:React.ReactNode
  footer?:React.ReactNode
  onClose:(e:any)=>void
}
const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
}).required();

export const DialogBox=({visible,onClose}:Props)=> {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data:any) => console.log(data);
  return (
    <Dialog open={visible} onOpenChange={(e)=>onClose(e)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative bg-slate-700 w-[150px] rounded-full">
            <img className="rounded-full z-0" src="/p.jpg" alt="profile" />
            <span className="text-white absolute z-20 
            top-[50%] left-[50%] translate-x-[-50%] 
            translate-y-[-50%]">
            <i className="fa-solid fa-trash mr-3 cursor-pointer hover:scale-[1.1] ease-out"></i>
            <i className="fa-solid fa-pen-to-square cursor-pointer hover:scale-[1.1] ease-out"></i>
            </span>
          </div>
          <div className="w-full flex gap-2">
          <div className="w-full">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input {...register("name")} className="col-span-3" />
            <small>{errors.name?.message}</small>
          </div>
          <div className="w-full">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input {...register("username")} className="col-span-3" />
          </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

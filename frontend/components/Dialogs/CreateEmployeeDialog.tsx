import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { axiosInstance } from "@/utils/api"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"
import {Dropdown} from '@/components/DropDown' 
import {roleState} from "@/redux/slices/roleSlice"
import { useSelector, useDispatch } from 'react-redux'
import { fetchRoles } from "@/service/roleService"
interface Props{
  visible:boolean,
  header?:React.ReactNode
  content?:React.ReactNode
  footer?:React.ReactNode
  onClose:(e:any)=>void
}
const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.string().required(),
  password:yup.string().min(8).required(),
  active:yup.boolean(),
}).required();

export const CreateEmployeeDialog=({visible,onClose}:Props)=> {

  const { register, handleSubmit, formState:{ errors },control } = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      active:true
    }
  });
  const roleStoreState = useSelector(roleState)
  const {roles, isLoading, error} = fetchRoles()
 
  const onSubmit = async(data:any) => {
         await axiosInstance.post('/signup',data).then(res=>{
          console.log(res)
         }).catch(err=>{
           console.log(err)
         })
  }
  return (
    <Dialog open={visible} onOpenChange={(e)=>onClose(e)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Employee</DialogTitle>
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
            <Input {...register("name")} className="input-field" />
            <small>{errors.name?.message}</small>
          </div>
          <div className="w-full">
            <Label htmlFor="role" className="text-right">Role</Label>
            {/* <Input {...register("role")} className="input-field" /> */}
            <Dropdown placeholder="Select Role" options={roles} onSelect={(e)=>console.log(e)} />
            <small className="text-red-600">{errors.role?.message}</small>
          </div>
          </div>
          <div className="w-full flex gap-2">
          <div className="w-full">
            <Label htmlFor="email" className="text-right">E-Mail</Label>
            <Input {...register("email")} className="input-field" />
            <small>{errors.email?.message}</small>
          </div>
          <div className="w-full">
            <Label htmlFor="password" className="text-right">Password</Label>
            <Input {...register("password")} className="input-field" />
            <small>{errors.password?.message}</small>
          </div>
          </div>
          <div className="w-full flex gap-2">
            <Label htmlFor="active" className="text-right">Active State</Label>
            <Controller
             name="active"
             control={control}
             render={({ field }) => (
               <Switch
                 checked={field.value}
                 onCheckedChange={field.onChange}
               />
             )}
            />
            <small>{errors.active?.message}</small>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
interface Props{
  visible:boolean,
  header?:React.ReactNode
  content?:React.ReactNode
  footer?:React.ReactNode
  onClose:(e:any)=>void
}
const schema = yup.object().shape({
  name: yup.string().required()
})
export const RequestLeave=({visible,onClose}:Props)=> {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  }); 
  return (
    <Dialog open={visible} onOpenChange={(e)=>onClose(e)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Leave</DialogTitle>
        </DialogHeader>
        <div className="flex w-full gap-2">
          <div className="w-full">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input {...register('name')} className="col-span-3" />
          </div>
          <div className="w-full">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

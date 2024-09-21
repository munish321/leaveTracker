import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dropdown } from "@/components/DropDown";
import { roleState } from "@/redux/slices/roleSlice";
import { userState } from "@/redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "@/service/roleService";
import {fetchUserImage} from "@/service/userService";
import { setCurrentUser } from "@/redux/slices/userSlice";
// import { Dropdown } from 'primereact/dropdown';
interface Props {
  visible: boolean;
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: (e: any) => void;
}
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
    password: yup.string().min(8).required(),
    active: yup.boolean(),
  })
  .required();

export const CreateEmployeeDialog = ({ visible, onClose }: Props) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      active: true,
    },
  });
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const roleStoreState = useSelector(roleState);
  const userStoreState = useSelector(userState);
  const { roles, isLoading, error } = fetchRoles();
  const [imageSrc, setImageSrc] = useState('');

  const onSubmit = async (data: any) => {
    await axiosInstance
      .post("/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserImage(userStoreState.userData.imageUrl)
        setImageSrc(response);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchData();
  }, []);

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("files", file);
      axiosInstance
        .post("/upload", formData)
        .then(async(res) => {
          dispatch(setCurrentUser(res.data.data))
          try {
            const response = await fetchUserImage(res.data.data.imageUrl)
            setImageSrc(response);
          } catch (error) {
            console.error("Error fetching image:", error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog open={visible} onOpenChange={(e) => onClose(e)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Employee</DialogTitle>
        </DialogHeader>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative bg-slate-700 w-[150px] h-[150px] rounded-[50%]">
            {/* <img className="rounded-full z-0" src={imageSrc} alt="profile" /> */}
            <img className="rounded-[50%] w-[150px] h-[150px] object-cover bg-center" src={imageSrc?imageSrc:'/pro.jpg'} alt="upload image" />
            <span
              className="text-white absolute z-20 
            top-[50%] left-[50%] translate-x-[-50%] 
            translate-y-[-50%]"
            >
              <i className="fa-solid fa-trash mr-3 cursor-pointer hover:scale-[1.1] ease-out"></i>
                <i
                  className="fa-solid fa-pen-to-square cursor-pointer hover:scale-[1.1] ease-out"
                  onClick={() => uploadImageRef.current?.click()}
                ></i>
                <input
                className="hidden"
                  ref={uploadImageRef}
                  type="file"
                  onChange={handleFileSelection}
                />
            </span>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input {...register("name")} className="input-field" />
              <small>{errors.name?.message}</small>
            </div>
            <div className="w-full">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Controller 
              name="role"
              control={control}
              render={({field})=>(
                <Dropdown onSelect={(e)=>field.onChange(e.code)} options={roles} 
                placeholder="Select a City" />
              )}
              />
              <small className="text-red-600">{errors.role?.message}</small>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <div className="w-full">
              <Label htmlFor="email" className="text-right">
                E-Mail
              </Label>
              <Input {...register("email")} className="input-field" />
              <small>{errors.email?.message}</small>
            </div>
            <div className="w-full">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input {...register("password")} className="input-field" />
              <small>{errors.password?.message}</small>
            </div>
          </div>
          <div className="w-full flex gap-2">
            <Label htmlFor="active" className="text-right">
              Active State
            </Label>
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
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

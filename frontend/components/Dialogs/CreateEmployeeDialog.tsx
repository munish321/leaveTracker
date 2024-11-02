import { Dialog } from "primereact/dialog";
import { axiosInstance } from "@/utils/api";
import { InputText } from "primereact/inputtext";
import { useEffect, ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "primereact/button";
import { Switch } from "@/components/ui/switch";
import { Dropdown } from "primereact/dropdown";
import { roleState } from "@/redux/slices/roleSlice";
import { userState } from "@/redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "@/service/roleService";
import { fetchUserImage } from "@/service/userService";
import { setCurrentUser } from "@/redux/slices/userSlice";
import { Calendar } from "primereact/calendar";

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
    phonenumber: yup.number().max(10).required(),
    dateofjoining: yup.date().required(),
    active: yup.boolean(),
  })
  .required();

export const CreateEmployeeDialog = ({ visible, onClose }: Props) => {
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
  console.log("servere component")
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const roleStoreState = useSelector(roleState);
  const userStoreState = useSelector(userState);
  const { roles, isLoading, error } = fetchRoles();
  const [imageSrc, setImageSrc] = useState("");

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
        const response = await fetchUserImage(userStoreState.userData.imageUrl);
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
        .then(async (res) => {
          dispatch(setCurrentUser(res.data.data));
          try {
            const response = await fetchUserImage(res.data.data.imageUrl);
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
  // upload component for image
  const UploadComponent =()=>(
    <div className="relative bg-slate-700 w-[122px] h-[122px] rounded-[50%] ccc">
            <img
              className="rounded-[50%] w-[122px] h-[122px] object-cover bg-center"
              src={imageSrc ? imageSrc : "/pro.jpg"}
              alt="upload image"
            />
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
              <InputText
                className="hidden"
                ref={uploadImageRef}
                type="file"
                onChange={handleFileSelection}
              />
            </span>
          </div>
  )

  return (
    <>
      <Dialog
        visible={visible}
        modal
        draggable={false}
        header="Create Employee"
        footer=" "
        style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          onClose(visible);
        }}
      >
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <UploadComponent />
          <div className="w-full flex gap-2 mt-[20px]">
            <div className="w-full flex flex-col">
              <label htmlFor="name" className="text-[15px] mb-[5px]">Name</label>
              <InputText {...register("name")} className="input-field" />
              <small>{errors.name?.message}</small>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="role" className="text-[15px] mb-[5px]">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Dropdown value={field.value} onChange={(e:any) => field.onChange(e)} options={roles} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" checkmark={true} highlightOnSelect={false} />
              
                )}
              />
              <small className="text-red-600">{errors.role?.message}</small>
            </div>
          </div>
          <div className="w-full flex gap-2 mt-[10px]">
            <div className="w-full flex flex-col">
              <label htmlFor="email" className="text-[15px] mb-[5px]">E-Mail</label>
              <InputText {...register("email")} className="input-field" />
              <small>{errors.email?.message}</small>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="password" className="text-[15px] mb-[5px]"> Password</label>
              <InputText {...register("password")} className="input-field" />
              <small>{errors.password?.message}</small>
            </div>
          </div>
          {/* block for phone number and date of joining */}
          <div className="w-full flex gap-2 mt-[10px]">
            <div className="w-full flex flex-col">
              <label htmlFor="phonenumber" className="text-[15px] mb-[5px]">Phone Number</label>
              <InputText {...register("phonenumber")} className="input-field" />
              <small>{errors.phonenumber?.message}</small>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="dateofjoining" className="text-[15px] mb-[5px]">Date of joining</label>
              <Controller
                name="dateofjoining"
                control={control}
                render={({ field }) => (
                  <Calendar
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                  />
                )}
              />
              <small className="text-red-600">{errors.role?.message}</small>
            </div>
          </div>
          <div className="w-full flex gap-2 mt-[10px]">
            <label htmlFor="active" className="text-[15px] mb-[5px]">Active State</label>
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
      </Dialog>
    </>
  );
};

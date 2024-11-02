import { useQuery } from "@tanstack/react-query";
import {axiosInstance} from "@/utils/api"

export const currentUserData =async()=>{
  const response = await axiosInstance.get('/logged-user');
  return response || [];
}

export const fetchUserImage =async(id:string)=>{
  const response = await axiosInstance.get(`/image/${id}`, { responseType: 'blob' });
  const blob = await response.data;
  const url = window.URL.createObjectURL(blob);
  return url;
}

export const userList =()=>{
   const {data,isLoading,error} = useQuery({
    queryKey:["userList"],
    queryFn:async()=>{
      const response =await axiosInstance.get("/users")
      return response.data.data 
   }})

   return {data,isLoading,error}
}
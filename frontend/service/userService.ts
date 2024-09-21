import { useQuery } from "@tanstack/react-query";
import {axiosInstance} from "@/utils/api"

export const useCurrentUser =async()=>{
  const response = await axiosInstance.get("/user");
  return response.data.data || [];
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
import { useQuery } from '@tanstack/react-query';
import {axiosInstance} from "@/utils/api"

export const leaveBalance = async(userId:string) => {
  // const { data: roles, isLoading, error } = useQuery({
    // queryKey: ['leave-balance'],
    // queryFn: async () => {
      const response = await axiosInstance.get(`/leave/remaining/${userId}`);
      console.log('response?.data?.data',response?.data);
      // response.data.data = response.data.data.map((role) => ({ name:role.name,code:role.code }));
      return response?.data?.remaingLeaves || [];
    }
  // });

  // return { roles, isLoading, error };
// };

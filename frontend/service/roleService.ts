import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setRoles } from '@/redux/slices/roleSlice';
import { useEffect } from 'react';
import { isPending } from '@reduxjs/toolkit';
import {axiosInstance} from "@/utils/api"
import type {IRole} from "@/redux/types/RoleType"

export const fetchRoles = () => {
  const dispatch = useDispatch();

  // Centralized fetching logic using react-query
  const { data: roles, isLoading, error } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: async () => {
      const response = await axiosInstance.get('/roles');
      response.data.data = response.data.data.map((role: IRole) => ({ value:role.name,code:role.code }));
      return response?.data?.data || [];
    }
  });
  useEffect(() => {
    if (roles) {
      dispatch(setRoles(roles));
    }
  }, []);

  return { roles, isLoading, error,isPending };
};

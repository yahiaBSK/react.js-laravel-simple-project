import { create } from "zustand";
import Api from "../api/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const studentStore = create((set) => ({
  students: [],
  setStudents: (data) => set({ students: data }),

  getStudents2: () => {
    return useQuery({
      queryKey: ["getStudents"],
      queryFn: async () => {
        const res = await axios.get(`${Api}/students`, {
          withCredentials: true,
          headers: {
            accept: "application/json",
          },
        });
        return res.data;
      },

      staleTime: 3000,
      cacheTime: 3000,
      refetchOnWindowFocus: false, // Do not refetch when window gains focus
      refetchOnReconnect: false, // Do not refetch when reconnecting
      refetchOnMount: false,
      onSuccess: (data) => {
        set({ students: data });
      },
    });
  },
}));

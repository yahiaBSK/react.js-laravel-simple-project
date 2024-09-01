import { create } from "zustand";
import Api from "../api/api"
import axios from "axios";


export const studentStore = create((set) => {

  return {

    addStudent: (students) => set({ students }),

    getStudent: (all_students) => set({
      getStudentsFromApi: () => {
        setLoadingData(true);
        axios.get(`${Api}/students`)
         .then((response) => {
            setLoadingData(false);
            setStudents(response.data);
          })
         .catch((error) => {
            console.log(error);
            setLoadingData(false);
          });
      },
    })

  };
});
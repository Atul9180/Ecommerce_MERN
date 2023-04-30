//@desc: Custom hook, use this hook to get all the category , can use whereever need to avoid redundant code:

import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategoryHook(){
    const [categories,setCategories]=useState([])


    //getAll categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAllCategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
     getAllCategory();
  },[])

  return categories;                //as need to use this state globally so returned 
}
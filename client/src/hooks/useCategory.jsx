import { useEffect, useState } from "react";
import axios from "axios";

const useCategory = () => {
  const [categories, setCategories] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  // get Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/categories`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;

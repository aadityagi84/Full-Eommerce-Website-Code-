import { useState, useEffect } from "react";
import AdminMenu from "../Layout/AdminMenu";
import Layout from "../Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { LiaUserEditSolid } from "react-icons/lia";

import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
const Products = () => {
  const [product, setProducts] = useState([]);

  //   getAll Product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/products/products`);
      setProducts(data.products);
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("erorr to fetch the products");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      <Layout>
        <div>
          <h2 className="text-2xl text-center  py-10 font-semibold dark:text-white transition-all duration-700  dar:text-gray-600">
            All Products List
          </h2>
          <div className="lg:container w-[95%] grid lg:grid-cols-[400px_1fr] grid-cols-1 gap-3 mx-auto  my-10 ">
            <div className=" ">
              <AdminMenu />
            </div>

            <div className="  ">
              <div className="flex  justify-center lg:justify-start   flex-wrap gap-2 items-start place-items-center">
                {product.map((data) => (
                  <Link
                    key={data._id} // Place the key directly on the Link component
                    to={`/dashboard/admin/products/${data.slug}`} // Assuming this is a relative path
                  >
                    <div className="relative  w-[320px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <img
                        className="rounded-t-lg object-contain w-[280px] h-[200px] mx-auto"
                        src={`${apiUrl}/api/v1/products/products-photo/${data._id}`}
                        alt={data.name} // It's good practice to provide an alt text
                      />

                      <div className="p-5">
                        <h5 className="mb-2 text-sm font-semibold tracking-tight text-[#2d2d2d] dark:text-white">
                          {data.name}
                        </h5>

                        <p className="mb-3 text-xl font-bold text-gray-700 dark:text-gray-400">
                          ${data.price}
                        </p>
                        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                          {data.quantity} are left in stock
                        </p>
                        <p className="mb-3  text-sm font-normal text-gray-600 dark:text-gray-400">
                          {data.description.substring(0, 20)}.....
                        </p>
                        <div className="w-[30px] absolute top-2 right-2 h-[30px] rounded-full bg-secondary/80 dark:bg-primary dark:hover:bg-secondary shadow-xl content-center transition-all duration-700 boxShadow border-primary/20 border">
                          <LiaUserEditSolid className="mx-auto text-[20px] text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;

import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import { Modal } from "antd";
import axios from "axios";
import { LiaUserEditSolid } from "react-icons/lia";
// Assuming CategoryForm is imported

const Filter = () => {
  // get Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/products/products`);
      setProducts(data.products);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []); // Run only once when the component mounts

  return (
    <>
      <div
        className="flex pt-2 items-center justify-center cursor-pointer"
        onClick={() => setModal2Open(true)}
      >
        <FaFilter className="text-2xl text-gray-800 dark:text-white" /> Filter
      </div>
      <div>
        <Modal
          title="Filter By Category"
          centered
          footer={null}
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          {/* Include form */}
        </Modal>
      </div>
      <div className="flex justify-center lg:justify-start flex-wrap gap-6 items-start place-items-center">
        {
          products.map((data) => (
            <div
              key={data._id}
              className="relative w-[320px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg object-contain w-[280px] h-[200px] mx-auto"
                src={`${apiUrl}/api/v1/products/products-photo/${data._id}`}
                alt={`Image of ${data.name}`} // Better alt text for accessibility
              />

              <div className="p-5">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-[#2d2d2d] dark:text-white">
                  {data.name}
                </h5>

                <p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">
                  {data.price}
                </p>
                <p className="mb-3 text-gray-700 dark:text-gray-400">
                  {data.quantity} are left in stock
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {data.description}
                </p>
                <div className="w-[30px] absolute top-2 right-2 h-[30px] rounded-full bg-secondary/80 dark:bg-primary dark:hover:bg-secondary shadow-xl content-center transition-all duration-700 boxShadow border-primary/20 border">
                  <LiaUserEditSolid className="mx-auto text-[20px] text-white" />
                </div>
              </div>
            </div>
          ))
          // Placeholder when no products
        }
      </div>
    </>
  );
};

export default Filter;

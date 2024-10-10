import Layout from "../Layout/Layout";
import AdminMenu from "../Layout/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  // create Categories
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem("auth"));

    // Access the token
    const token = storedData ? storedData.token : null;

    // console.log(token); // Outputs the token if available

    try {
      // Adjust this based on where you store your token

      const { data } = await axios.post(
        `${apiUrl}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCatgeories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the category");
    }
  };

  //  to get All Categories
  const getAllCatgeories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/categories`);
      if (data.success) {
        setCategories(data.category);
        // console.log(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong to geting category");
    }
  };

  useEffect(() => {
    getAllCatgeories();
  }, []);

  // update the categories
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Retrieve stored data
    const storedData = JSON.parse(localStorage.getItem("auth"));

    // Access the token
    const token = storedData ? storedData.token : null;

    // Check if token exists before making the request
    if (!token) {
      toast.error("No authorization token found. Please log in again.");
      return;
    }

    // Ensure `selected` and `updatedName` have valid values
    if (!selected || !updatedName) {
      toast.error("Please select a category and provide a valid name.");
      return;
    }

    try {
      // API call to update the category
      const { data } = await axios.put(
        `${apiUrl}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response
      if (data.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setModal2Open(false);
        getAllCatgeories();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to Update");
    }
  };

  // Delete the categories
  const handleDelete = async (id) => {
    // Retrieve stored data
    const storedData = JSON.parse(localStorage.getItem("auth"));

    // Access the token
    const token = storedData ? storedData.token : null;

    // Check if token exists before making the request
    if (!token) {
      toast.error("No authorization token found. Please log in again.");
      return;
    }

    try {
      // API call to update the category
      const { data } = await axios.delete(
        `${apiUrl}/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response
      if (data.success) {
        toast.success(`Category is Deleted`);
        getAllCatgeories();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to Update");
    }
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl text-center  py-10 font-semibold dark:text-white transition-all duration-700  dar:text-gray-600">
          Manage Category
        </h2>
        <div className="container grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 mx-auto  mb-10 ">
          <div className=" ">
            <AdminMenu />
          </div>

          <div className="  ">
            <div className="cards">
              <div>
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              <div className="relative border overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs border-b  text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="px-4">
                      <th scope="col" className="px-6 py-4 text-xl ">
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-4  text-center text-xl "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((cat) => (
                      <tr
                        key={cat._id}
                        className="bg-white border-b px-8 dark:bg-gray-800 dark:border-gray-700 "
                      >
                        <td className=" text-lg pl-4">{cat.name}</td>
                        <td className="px-6 py-4  text-center">
                          <a
                            onClick={() => {
                              setModal2Open(true);
                              setUpdatedName(cat.name);
                              setSelected(cat);
                            }}
                            className="font-medium text-white cursor-pointer rounded-md px-6  bg-primary py-2 dark:text-white  hover:bg-secondary dark:bg-secondary dark:hover:bg-gray-900 dark:hover:text-primary  duration-700 transition-all  "
                          >
                            Edit Category
                          </a>
                          <a
                            onClick={() => {
                              handleDelete(cat._id);
                            }}
                            className="font-medium ml-2 cursor-pointer text-white rounded-md px-6  bg-red-600 py-2 dark:text-white  hover:bg-red-500 dark:bg-red-600 dark:hover:bg-gray-900 dark:hover:text-primary  duration-700 transition-all  "
                          >
                            Delete Category
                          </a>
                        </td>
                      </tr>
                    ))}

                    <Modal
                      title="Update Category"
                      centered
                      footer={null}
                      open={modal2Open}
                      onOk={() => setModal2Open(false)}
                      onCancel={() => setModal2Open(false)}
                    >
                      <CategoryForm
                        value={updatedName}
                        setValue={setUpdatedName}
                        handleSubmit={handleUpdate}
                      />
                    </Modal>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

import { useState, useEffect } from "react";
import AdminMenu from "../Layout/AdminMenu";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
const { Option } = Select;
const CreateProducts = () => {
  const [categories, setCategories] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("0");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  //get All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/categories`);
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []); // Run only once when the component is mounted

  // create product function
  // const handleCreateProduct = async (e) => {
  //   e.preventDefault();
  //   const storedData = JSON.parse(localStorage.getItem("auth"));

  //   // Access the token
  //   const token = storedData ? storedData.token : null;

  //   console.log(token); // Outputs the token if available
  //   try {
  //     const productData = new FormData();
  //     productData.append("name", name);
  //     productData.append("description", description);
  //     productData.append("price", price);
  //     productData.append("quantity", quantity);
  //     // productData.append("shipping", shipping);
  //     productData.append("category", category);
  //     productData.append("photo", photo);
  //     // productData.append("name", name);
  //     const { data } = await axios.post(
  //       `${apiUrl}/api/v1/products/create-product`,
  //       productData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (data?.success) {
  //       toast.success("Product Created Successfully");
  //       navigate("/dashboard/admin/products");
  //     } else {
  //       toast.error(data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("something went wrong to create Product");
  //   }
  // };
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("auth"));
    const token = storedData ? storedData.token : null;

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      if (photo) productData.append("photo", photo); // append file correctly
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${apiUrl}/api/v1/products/create-product`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // important for handling files
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong to create Product");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if a file is selected
    if (selectedFile) {
      // Convert size to MB and check if it's less than 1MB
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 1) {
        toast.error("Image size should be less than 1MB.");
        setPhoto(null); // Reset the selected photo if it exceeds the size limit
      } else {
        setPhoto(selectedFile); // Set the file if it's valid
      }
    }
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  // Function to toggle preview visibility
  const togglePreview = () => {
    setPreviewVisible(!previewVisible); // Toggles the visibility state
  };
  return (
    <Layout>
      <div>
        <h2 className="text-2xl text-center  py-10 font-semibold dark:text-white transition-all duration-700  dar:text-gray-600">
          Create Products
        </h2>
        <div className="lg:container w-[95%] grid lg:grid-cols-[400px_1fr] grid-cols-1 gap-3 mx-auto  my-10 ">
          <div className=" ">
            <AdminMenu />
          </div>

          <div className="  ">
            <div className=" m-1 grid lg:grid-cols-2  grid-cols-1 gap-4">
              <div>
                <div className="flex flex-col gap-4">
                  <Select
                    placeholder="Select the Category "
                    size="large"
                    showSearch
                    className=" w-full rounded-md px-2"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((cat) => (
                      <Option
                        key={cat._id}
                        value={cat._id}
                        className="cursor-pointer"
                      >
                        {cat.name}
                      </Option>
                    ))}
                  </Select>

                  <div className="">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center h-30 justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                      >
                        {/* Display the uploaded photo name or default text */}
                        {photo ? (
                          photo.name
                        ) : (
                          <>
                            <div className="flex flex-col  items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG (MAX. 1MB)
                              </p>
                            </div>
                          </>
                        )}
                        <input
                          id="dropzone-file"
                          type="file"
                          accept="image/* "
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-2 overflow-hidden">
                    {photo && (
                      <>
                        {/* Toggle button */}
                        <div className="text-center bg-gray-600 text-white rounded-md">
                          <button
                            onClick={togglePreview}
                            className="px-4 w-full py-2  "
                          >
                            {previewVisible ? "Hide Preview" : "Show Preview"}
                          </button>
                        </div>

                        {/* Image preview */}
                        {previewVisible && (
                          <div className="text-center h-[200px] w-[200px] mx-auto">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product-photo"
                              className="object-contain"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Description
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers
                      if (/^\d*$/.test(value)) {
                        setPrice(value);
                      }
                    }}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Price
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Quantity
                  </label>
                </div>
              </div>
              <div className=" border rounded-md overflow-hidden border-1 w-full mb-5 group">
                <Select
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="w-full cursor-pointer bg-white dark:bg-gray-800 dark:text-white text-black"
                  onChange={(value) => setShipping(value)}
                >
                  <Option
                    value="0"
                    className="bg-white dark:bg-gray-700 dark:text-white text-black"
                  >
                    No
                  </Option>
                  <Option
                    value="1"
                    className="bg-white dark:bg-gray-700 dark:text-white text-black"
                  >
                    Yes
                  </Option>
                </Select>
              </div>

              <button
                type="submit"
                onClick={handleCreateProduct}
                className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2 text-center dark:bg-secondary dark:hover:bg-primary dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;

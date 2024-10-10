import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const CategoriesList = () => {
  const [products, setProducts] = useState([]); // Initialize as array for multiple products
  const [category, setCategory] = useState({});
  const navigate = useNavigate(); // Initialize as object for a single category

  const params = useParams();

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products || []); // Safeguard against null/undefined
      setCategory(data?.category || {}); // Safeguard against null/undefined
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]); // Add params.slug as dependency

  return (
    <div>
      <Layout>
        {/* <h1 className="text-center text-3xl my-4">Category Product</h1> */}
        <h2 className="text-center text-3xl my-6">{category?.name}</h2>

        <div className="grid grid-cols-1  h-[60vh] mx-4  my-6 md:grid-cols-2   lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  place-items-center gap-20">
          {products.length > 0 ? (
            products.map((data) => (
              <div key={data._id} className="w-[300px] ">
                <img
                  src={`${apiUrl}/api/v1/products/products-photo/${data._id}`}
                  alt={data.name}
                  className=" aspect-[2/2]  mx-auto  object-contain object-top  rounded-md"
                />
                <div className="">
                  <p className="text-sm font-semibold">
                    {data.name || "Product Name"}
                  </p>

                  <h3 className="font-bold text-xl">
                    ${data.price || "Price not available"}
                  </h3>
                  <p className="text-sm">
                    {data?.description
                      ? `${data.description.substring(0, 20)}...`
                      : "No description available"}
                  </p>

                  <div className="flex items-center gap-1 text-sm">
                    {data.quantity || "Out of stock"} left in stock
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="bg-primary/80  text-black  py-2 rounded-md">
                      {" "}
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/products/${data.slug}`)}
                      className="bg-gray-700 text-white  py-2 rounded-md"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CategoriesList;

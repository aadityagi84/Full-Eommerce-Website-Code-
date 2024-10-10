import { useEffect, useState } from "react";
// import { FaFilter } from "react-icons/fa";
import { Checkbox, Radio } from "antd";
// import { Modal } from "antd";
import axios from "axios";
import { Prices } from "../Filter/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast";

const Products = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [modal2Open, setModal2Open] = useState(false);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCatgeories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/category/categories`);
      if (data.success) {
        setCategories(data.category);
        // console.log(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCatgeories();
  }, []);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //  ====================================
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]); // Run only once when the component mounts

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  // load more function
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${apiUrl}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/v1/products/product-filters`,
        { checked, radio } // Send as object
      );
      setProducts(data?.products);
    } catch (error) {
      console.error("Error filtering products:", error); // Log error properly
    }
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-10 mx-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            quibusdam provident vel. Repellendus quibusdam provident vel.
          </p>
        </div>

        {/* Body Section */}
        <div className=" grid grid-cols-1 gap-4 lg:grid-cols-[200px,1fr]">
          <div className="filter ">
            <p className="font-semibold  pb-4  text-[20px]">
              Filter By Category
            </p>
            <div className="flex flex-col items-start justify-center gap-2">
              {categories?.map((data) => (
                <Checkbox
                  key={data._id}
                  className="text-[17px] "
                  onChange={(e) => handleFilter(e.target.checked, data._id)}
                >
                  {data.name}
                </Checkbox>
              ))}
            </div>
            <p className="font-semibold  pb-4  text-[20px]">Filter By Price</p>
            <div className="flex flex-col items-start justify-center gap-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <button
                className=" px-4 bg-primary text-white rounded-md py-2 mt-2"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-2   lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  place-items-center gap-20">
            {/* {JSON.stringify(radio, null, 4)} */}
            {/* Dynamic Products */}
            {products.length > 0 ? (
              products.map((data) => (
                <div
                  data-aos="fade-up"
                  data-aos-once="true"
                  key={data._id}
                  className="w-[300px] "
                >
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
                      <button
                        className="bg-primary/80  text-black  py-2 rounded-md"
                        onClick={() => {
                          setCart([...cart, data]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, data])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
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

          {/* View All Button */}
          {/* <div className="flex justify-center items-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-2 px-6 rounded-md">
              View All Button
            </button>
          </div> */}
        </div>
      </div>
      <div className="w-[200px] mx-auto">
        {products && products.length < total && (
          <button
            className="px-4 py-2  mt-4 font-semibold text-white bg-secondary rounded hover:bg--60 dark:bg-primary dark:hover:bg-secondary dark:text-gray-300  duration-300  "
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading...." : "Load More "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;

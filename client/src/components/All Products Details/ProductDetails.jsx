import axios from "axios";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import "./products.css";
import { FaPen } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  // Function to fetch product data
  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${apiUrl}/api/v1/products/products/${params.slug}`
  //     );
  //     //  console.log("Product Data:", data?.product); // Debugging
  //     setProduct(data?.product);

  //     if (data?.product?._id && data?.product?.category?._id) {
  //       getSimilarPRoducts(data.product._id, data.product.category._id);
  //       console.log(
  //         getSimilarPRoducts(data.product._id, data.product.category._id)
  //       ); // Pass category id as well
  //     }

  //     setLoading(false); // Set loading to false once product is loaded
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //     setLoading(false);
  //   }
  // };
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/products/${params.slug}`
      );

      // Ensure product data exists before proceeding
      if (data?.product) {
        setProduct(data.product);

        // Log product and category for debugging
        // console.log("Product:", data.product);
        // console.log("Category:", data.product.category);

        // Check if the product and category exist before calling related products API
        if (data.product._id && data.product.category) {
          getSimilarPRoducts(data.product._id, data.product.category);
        } else {
          console.error("Product ID or Category ID is undefined");
        }
      } else {
        console.error("Product not found");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  // Get similar products
  const getSimilarPRoducts = async (pid, cid) => {
    try {
      // Log to confirm that correct IDs are being passed
      // console.log("Fetching related products for pid:", pid, "and cid:", cid);

      if (!pid || !cid) {
        // console.error("Missing product or category ID");
        return;
      }

      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/related-products/${pid}/${cid}`
      );

      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  // Fetch product details when the slug changes
  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params.slug]);

  useEffect(() => {
    getSimilarPRoducts();
  }, []);

  return (
    <Layout>
      {loading ? (
        <p>Loading...</p> // Show loading state while fetching product data
      ) : product ? (
        <>
          <main className="hello">
            <div className="card dark:bg-gray-600/60 dark:text-white ">
              <p
                className="w-[40px] content-center text-center h-[40px] inset-3 bg-secondary rounded-full cursor-pointer m-2  transition-all duration-700 ease-in-out hover:bg-primary dark:bg-primary dark:hover:bg-secondary"
                onClick={() => navigate(-1)}
              >
                <IoArrowBack className="mx-auto text-white " />
              </p>
              <div className="card__title dark:text-white  ">
                <div className="icon">
                  <a href="#">
                    <i className="fa fa-arrow-left"></i>
                  </a>
                </div>
                <h3 className="dark:text-white text-[#252525]">
                  Product Details
                </h3>
              </div>
              <div className="card__body dark:text-white ">
                <div className="half">
                  <div className="featured_text dark:text-white ">
                    <h1 className="dark:text-white  text-[#252525]">
                      {product.name}
                    </h1>

                    {/* Show category name */}
                    <p className="text-4xl">{product?.category?.name}</p>

                    <p className="price pt-4 dark:text-white text-[#252525]">
                      ${product.price}
                    </p>
                  </div>
                  {/* Image Zoom Container */}
                  <div className="image-zoom-container">
                    <div
                      className="image-container"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={`${apiUrl}/api/v1/products/products-photo/${product._id}`}
                        alt={product.name}
                        id="productImage"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="half">
                  <div className="description dark:text-white  font-medium  text-[#2d2d2d]">
                    <p>{product.description}</p>
                  </div>
                  <span className="stock flex  items-center gap-2">
                    <FaPen className="text-sm" />
                    {product.quantity > 0
                      ? `${product.quantity} In stock`
                      : "Out of stock"}
                  </span>
                  <div className="reviews">
                    <ul className="stars">
                      {[...Array(5)].map((_, index) => (
                        <li key={index}>
                          <i
                            className={`fa ${
                              index < product.rating ? "fa-star" : "fa-star-o"
                            }`}
                          ></i>
                        </li>
                      ))}
                    </ul>
                    <span>({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="card__footer flex items-end justify-between">
                <div className="action">
                  <button type="button">Add to cart</button>
                </div>
              </div>
            </div>
          </main>

          {relatedProducts?.length > 0 ? (
            <>
              <h1 className="text-2xl font-semibold py-4 text-center pb-10">
                Some Related Products
              </h1>
              <div className="grid container grid-cols-1 my-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center gap-20">
                {relatedProducts?.map((data) => (
                  <div key={data._id} className="w-[300px]">
                    <img
                      src={`${apiUrl}/api/v1/products/products-photo/${data._id}`}
                      alt={data.name}
                      className="aspect-[2/2] mx-auto object-contain object-top rounded-md"
                    />
                    <div>
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
                        <button className="bg-primary/80 text-[#252525] py-2 rounded-md">
                          Add to Cart
                        </button>
                        {/* Uncomment this for "More Details" button */}
                        {/* <button
                className="bg-gray-700 text-white py-2 rounded-md"
                onClick={() => navigate(`/products/${data.slug}`)}
              >
                More Details
              </button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <p>Product not found</p>
      )}
    </Layout>
  );
};

export default ProductDetails;

// import React from "react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import Layout from "../Layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import Products from "../Products/Products";
import axios from "axios";
import Loader2 from "../Loader/Loader2";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Card");
  const [paymentError, setPaymentError] = useState(null);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  // create instance comes with from api of braintree
  const [instance, setInstance] = useState("");

  // total Price
  const totalPrice = () => {
    try {
      let total = cart?.reduce((acc, item) => acc + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00"; // Return default value if there's an error
    }
  };

  const handleRemoveItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === id);
      myCart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  // get PaymentGateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/braintree/token`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setClientToken(data?.clientToken);
      // further code here...
    } catch (error) {
      console.error("Error fetching Braintree token:", error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handlePayemnt
  const handlePayment = async () => {
    try {
      // Request payment method nonce from Braintree instance
      const { nonce } = await instance.requestPaymentMethod();

      // Send payment request to backend
      const { data } = await axios.post(
        `${apiUrl}/api/v1/products/braintree/payment`,
        {
          nonce, // Add nonce in request body
          cart, // Add cart data in request body
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Set authorization token
          },
        }
      );

      // If payment is successful, clear cart and redirect user
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment Successfully");
    } catch (error) {
      // Log and show error message
      console.error(error);
      toast.error("Payment failed, please try again");
    }
  };

  return (
    <div>
      <Layout>
        <div className="my-8">
          <h1 className="text-center my-8 font-semibold  text-2xl">
            {" "}
            😊 Hello! {auth?.token && auth?.user?.name}&nbsp;...
          </h1>

          <div className="xl:container w-[90%] mx-auto lg:flex  items-start justify-center">
            {auth?.token ? (
              <>
                <div className="lg:w-[70%] w-full bg-white dark:bg-gray-900 shadow-md rounded-lg">
                  {/* <!-- Header Section --> */}
                  <div className="flex justify-center items-center bg-gray-700 dark:bg-gray-800 text-white p-4 lg:rounded-tl-lg rounded-t-lg ">
                    <span className="text-xl">
                      {cart.length > 0
                        ? `Review of your ${cart.length} item${
                            auth?.token ? "" : " - Please login to checkout"
                          }`
                        : "Your Cart is empty"}
                    </span>
                  </div>

                  {/* <!-- Product Section --> */}
                  {cart?.map((product) => (
                    <div key={product._id}>
                      <div>
                        <div className="flex p-4 py-6 dark:bg-gray-800">
                          <div className="w-[280px]">
                            {/* <!-- Image --> */}
                            <img
                              className="object-cover rounded-md"
                              src={`${apiUrl}/api/v1/products/products-photo/${product._id}`}
                              alt={product.name}
                            />
                          </div>
                          {/* <!-- Product Details --> */}
                          <div className="flex-grow px-4">
                            <h3 className="text-xl font-bold dark:text-white">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {product.description.substring(0, 150)}...
                            </p>
                            <div className="text-emerald-500 font-semibold my-2">
                              <i className="fas fa-calendar-alt"></i> 30 DAYS
                              FREE RETURNS
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 mb-2">
                              3-5 working days
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <span className="dark:text-white">
                                  Shipping:
                                </span>
                                <span className="dark:text-gray-200">
                                  {product?.shipping ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Pricing Section --> */}
                          <div className="flex flex-col justify-between items-end">
                            <div className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
                              ${product.price}/{" "}
                              <span className="font-medium text-sm">only</span>{" "}
                            </div>
                            <div className="text-emerald-500 flex gap-2 font-bold">
                              <button
                                className="bg-red-600 w-[200px] dark:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
                                onClick={() => handleRemoveItem(product._id)}
                              >
                                Remove item
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr className="dark:border-gray-700" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:w-[30%] w-full lg:mt-0 mt-4 h-full">
                  <div className="bg-gray-700 dark:bg-gray-800 p-4 text-white rounded-t-lg lg:rounded-tr-lg">
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-xl text-center">Your Cart Summary</h2>
                    </div>
                  </div>
                  <p className="text-center py-4">Total | CheckOut | Payment</p>
                  <hr className="w-[90%] mx-auto" />
                  <p className="text-2xl font-semibold text-center mt-4">
                    Total AMT: {totalPrice()}
                  </p>
                  <div className="">
                    {auth?.user?.address ? (
                      <div className=" ">
                        <div className=" flex  gap-2  mt-4  items-center justify-center ">
                          <h4 className="text-bold   text-xl">
                            Current Address :
                          </h4>
                          <h5 className="capitalize text-sm">
                            {auth?.user?.address}
                          </h5>
                        </div>
                        {/* Fixed typo */}
                        {/* <h5>{auth?.token}</h5> */}
                        <div className="w-[80%] grid grid-cols-1 gap-2 mx-auto mt-10">
                          <button
                            onClick={() => navigate(`/dashboard/user/profile`)}
                            className="bg-secondary   w-full dark:bg-secondary text-white font-semibold px-4 py-2 rounded-md "
                          >
                            Update Address
                          </button>
                          <div className="w-[80%] grid grid-cols-1 gap-2 mx-auto mt-10">
                            {clientToken || !cart?.length ? (
                              ""
                            ) : (
                              <>
                                <DropIn
                                  options={{
                                    authorization: clientToken,
                                    paypal: { flow: "vault" },
                                    debug: true,
                                  }}
                                  onInstance={(instance) =>
                                    setInstance(instance)
                                  }
                                />
                                {instance && (
                                  <button
                                    onClick={handlePayment}
                                    className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
                                  >
                                    {}
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {auth?.token ? (
                          <div className="w-[80%] grid grid-cols-1 gap-2 mx-auto mt-4 ">
                            <button
                              onClick={() =>
                                navigate(`/dashboard/user/profile`)
                              }
                              className="bg-secondary   dark:bg-secondary text-white font-semibold px-4 py-2 rounded-md "
                            >
                              Update Address
                            </button>
                            <div className="w-[80%] grid grid-cols-1 gap-2 mx-auto mt-10">
                              {clientToken ? (
                                <>
                                  <DropIn
                                    options={{
                                      authorization: clientToken,
                                      paypal: { flow: "vault" },
                                      debug: true,
                                    }}
                                    onInstance={(instance) =>
                                      setInstance(instance)
                                    }
                                  />
                                  {instance && (
                                    <button
                                      onClick={handlePayment}
                                      className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
                                    >
                                      Pay Now
                                    </button>
                                  )}
                                </>
                              ) : (
                                <p>Loading payment options...</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              navigate(`/login,{
                              state:"/cart"}`)
                            }
                            className="bg-secondary  dark:bg-secondary text-white font-semibold px-4 py-2 rounded-md "
                          >
                            Please Login to checkout
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-700 dark:text-gray-200">
                <h2 className="text-2xl">Please log in to view your cart.</h2>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-emerald-500 dark:bg-emerald-600 text-white font-semibold px-4 py-2 mt-4 rounded-md"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Cart;

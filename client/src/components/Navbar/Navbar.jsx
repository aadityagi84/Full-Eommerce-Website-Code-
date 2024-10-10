/* eslint-disable react/prop-types */
import { useState } from "react";
import Logo from "../../assets/logo.png";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import { useSearch } from "../../context/SearchContext";
import axios from "axios";
// custom hooks
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Avatar, Badge } from "antd";

const Menu = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "About Us", link: "/about" },
  { id: 3, name: "Top Rated", link: "/services" },
  { id: 4, name: "Kids Wear", link: "/" },
  { id: 5, name: "Mens Wear", link: "/" },
  { id: 6, name: "Electronics", link: "/" },
];

const apiUrl = import.meta.env.VITE_API_URL;
function Navbar() {
  // State for profile dropdown visibility
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [secondDrop, setSecondDrop] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  // Toggle function for profile dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const toggleSecondDropdown = () => {
    setSecondDrop(!secondDrop);
  };
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" }); // Reset to an object
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // search context
  const [values, setValues] = useSearch();

  const navigate = useNavigate();
  const handleSubmitSearchForm = async (e) => {
    e.preventDefault();

    if (!values.keyword) {
      console.log("Keyword is required");
      return;
    }

    try {
      const { data } = await axios.get(
        `${apiUrl}/api/v1/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search"); // Corrected typo
    } catch (error) {
      console.log(error);
    }
  };
  const categories = useCategory();
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white  sticky top-0 z-[9990]   ">
      {/* Upper Navbar */}
      <div className="relative z-40 ">
        <div className="bg-primary/40 py-6 sm:py-4 md:py-6  ">
          <div className="lg:container w-[98%] mx-auto flex justify-between items-center flex-row ">
            <div>
              <NavLink
                to="/"
                className="font-bold text-2xl sm:text-3xl flex gap-2"
              >
                <img src={Logo} alt="logo" className="w-10 uppercase" />
                Shopsy
              </NavLink>
            </div>
            {/* Search bars and buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="group relative hidden md:block">
                <form onSubmit={handleSubmitSearchForm}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={values.keyword}
                    onChange={(e) =>
                      setValues({ ...values, keyword: e.target.value })
                    }
                    className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all dark:border-gray-500 dark:bg-gray-800 dark:text-white duration-300 rounded-full border border-gray-300 px-6 py-2 focus:outline-none focus:border-1 focus:border-orange"
                  />
                  <button type="submit">
                    <FaSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
                  </button>
                </form>
              </div>
              <div className="md:block hidden">
                <Link to={"/cart"}>
                  {/* <button
                  // onClick={() => handleOrderPopued()}
                  className="bg-gradient-to-r from-primary to-secondary  transition-all duration-1000 h-[40px] w-[40px]   text-white  flex items-center  group hover:bg-green-500"
                >
                  {" "}
                  {/* Updated to FaCartPlus */}
                  {/* <Badge count={cart?.length} showZero color="#faad14">
                    <span className="transition-all duration-300 ease-in group-hover:block"></span>
                  </Badge>
                </button> */}
                  <div className="relative">
                    <Badge
                      count={cart?.length}
                      showZero
                      overflowCount={10}
                      color="#faad14"
                    >
                      <Avatar shape="square" size="large" />
                    </Badge>
                    <FaCartShopping className="text-white text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                  </div>
                </Link>
              </div>
              <div className="flex items-center  h-[50px] w-[50px] space-x-3 relative ">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={toggleDropdown} // Toggle dropdown on click
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                  />
                </button>

                {/* Profile dropdown */}
                {isDropdownVisible && (
                  <div
                    className="absolute top-8 -left-20 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-700"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white uppercase font-semibold">
                        😊 Hello {auth.user ? auth.user.name : "Guest"}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {auth.user ? auth.user.email : "guest@gmail.com"}
                      </span>
                    </div>
                    <ul className="py-2">
                      {!auth || !auth.user ? (
                        <>
                          <li>
                            <Link
                              to="/register"
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                            >
                              Register
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/login"
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                            >
                              LogIn
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              to={`/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`}
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              onClick={handleLogout}
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                            >
                              Sign out
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {/* Darkmode Switch */}
              <DarkMode />
            </div>
          </div>
        </div>

        {/* Lower Navbar */}
        <div className="flex overflow-x-auto justify-center  md:overflow-visible w-full no-scrollbar  gap-20  py-2">
          <div className="  ">
            <ul className="flex   md:flex-row  gap-4 md:w-auto items-center justify-center space-x-4">
              {Menu.map((data, id) => (
                <li key={id} className="flex-shrink-0">
                  <NavLink
                    to={data.link}
                    className={({ isActive }) =>
                      `inline-block px-4 hover:text-primary duration-700 ${
                        isActive ? "text-primary" : ""
                      }`
                    }
                  >
                    {data.name}
                  </NavLink>
                </li>
              ))}

              {/* Simple dropdown and links */}
              <li className="group relative cursor-pointer md:block hidden flex-shrink-0">
                <Link
                  to={"/categories "}
                  className={`flex items-center gap-[2px] py-2`}
                  onClick={toggleSecondDropdown}
                >
                  Categories
                  <span>
                    <FaCaretDown className="transition-all duration-700 group-hover:rotate-180" />
                  </span>
                </Link>

                {/* Temporarily remove 'hidden' for testing */}

                <div className="absolute top-10  group-hover:block hidden duration-700 mt-[1px] w-48 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-700">
                  <ul>
                    <li className="px-2">
                      <Link
                        to={`/categories`}
                        className={`inline-block w-full rounded-md p-2 hover:bg-primary/20`}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.length > 0 &&
                      categories.map((data, id) => (
                        <li key={id} className="px-2">
                          <Link
                            to={`/categories/${data.slug}`}
                            className={`inline-block w-full rounded-md p-2 hover:bg-primary/20`}
                          >
                            {data.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

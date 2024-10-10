import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();

  // get user Data

  useEffect(() => {
    // Ensure auth.user exists before destructuring
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setEmail(email);
      setAddress(address);
      SetPhone(phone);
      // Only set password if it's available (be cautious with security)
      setpassword(""); // Set password to empty for user input (if needed)
    }
  }, [auth?.user]);

  const handleProfileUpdateForm = async (e) => {
    e.preventDefault();
    console.log(auth?.token); // Logging token for debugging

    try {
      // Make the PUT request to update the profile
      const { data } = await axios.put(
        `${apiUrl}/api/v1/auth/profile`,
        {
          // Body data sent to the server
          name,
          email,
          password, // Send password only if necessary
          phone,
          address,
        },
        {
          // Set Authorization header with Bearer token
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      // Check for errors in the response
      if (data?.error) {
        toast.error(data.error); // Show error message
      } else {
        // Update the auth state with the updated user data
        setAuth({ ...auth, user: data?.updatedUser || auth?.user });

        // Ensure that the user data in localStorage is updated safely
        let ls = localStorage.getItem("auth");
        if (ls) {
          ls = JSON.parse(ls);
          // Update only the user field if data contains an updated user object
          ls.user = data?.updatedUser || auth?.user;
          localStorage.setItem("auth", JSON.stringify(ls));
        }

        // Success notification
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      // Handle errors from API response
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div>
        <div className="container grid  grid-cols-1 lg:grid-cols-[400px_1fr] gap-3 mx-auto  my-10 ">
          <div className=" ">
            <UserMenu />
          </div>

          <div className=" mb-4 ">
            <div className="rounded-md w-full flex items-center justify-center text-center bg-primary dark:bg-secondary  md:px-16 px-0 z-0">
              <div
                className="absolute hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center dark:bg-gray-900 sm:p-2 p-4"
                style={
                  {
                    // backgroundImage: `url(${banner})`,
                  }
                }
              >
                <div className="absolute bg-black opacity-60 inset-0 z-0 dark:bg-opacity-80"></div>
              </div>
              <div className="w-full py-6 z-20 sm:p-2 p-4">
                <h1 className="my-6 text-3xl font-semibold dark:text-gray-200 text-gray-900">
                  User Profile
                </h1>
                <form
                  className="mt-4 py-10 space-y-6"
                  action=""
                  onSubmit={handleProfileUpdateForm}
                >
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="w-full px-4 py-2 rounded-md dark:border outline-secondary border-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full px-4 py-2 rounded-md dark:border outline-secondary  border-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only numbers
                        if (/^\d*$/.test(value)) {
                          SetPhone(value);
                        }
                      }}
                      placeholder="Enter Your Mobile Number"
                      className="w-full px-4 py-2 rounded-md dark:border outline-secondary border-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="Create Your Password"
                      className="w-full px-4 py-2 rounded-md dark:border outline-secondary  border-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <textarea
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Fill your Address"
                      className="w-full px-4 py-2 rounded-md dark:border outline-secondary  border-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-md  text-white rounde-md bg-gray-800 dark:bg-gray-600"
                  >
                    Upadte Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

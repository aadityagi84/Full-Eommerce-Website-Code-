import { FaUser, FaMobileAlt, FaClock } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import banner from "../../assets/contact-us-banner.png";

const Contact = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="w-full h-full flex flex-col items-center bg-gray-50 dark:bg-gray-900">
        {/* Header */}

        <div className="relative w-full h-[300px] bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center">
          {/* Background shapes */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-300 opacity-50 rounded-full dark:bg-blue-700"></div>
          <div className="absolute top-10 right-0 w-[200px] h-[200px] bg-pink-300 opacity-50 rounded-full dark:bg-pink-700"></div>
          <div className="absolute bottom-10 left-20 w-[150px] h-[150px] bg-purple-300 opacity-50 rounded-full dark:bg-purple-700"></div>

          {/* Text and Avatar */}
          <div className="flex items-center justify-between relative max-w-6xl w-full px-6">
            {/* Text Section */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Get the help you need.
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-300">
                Give us a few details and we’ll offer the best solution. <br />
                Connect by phone, chat, email, and more.
              </p>
            </div>

            {/* Avatar Section */}
            <div className="relative">
              <img
                src={banner} // Replace this with the actual avatar path
                alt="Support Avatar"
                className="w-[205px]  object-contain"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="my-6 flex flex-col items-center text-center">
          {/* Title and Description */}
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Get the help you need.
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Give us a few details and we’ll offer the best solution. Connect by
            phone, chat, email, and more.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-md relative mb-10">
            <input
              type="text"
              placeholder="Tell us what's happening"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          {/* Cards for options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* View your products */}
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-md hover:shadow-lg transition-shadow">
              <FaUser className="text-3xl text-gray-700 dark:text-gray-300 mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                View your products
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Sign in with your Apple ID for personalized support and to see
                repair coverage.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign in ›
              </a>
            </div>

            {/* See all products */}
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-md hover:shadow-lg transition-shadow">
              <FaMobileAlt className="text-3xl text-gray-700 dark:text-gray-300 mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                See all products
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                You can also get started by choosing a product and finding your
                issue.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Choose a product ›
              </a>
            </div>

            {/* View support activity */}
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 shadow-md rounded-md hover:shadow-lg transition-shadow">
              <FaClock className="text-3xl text-gray-700 dark:text-gray-300 mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                View support activity
              </h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                You can view your support requests.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View activity ›
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;

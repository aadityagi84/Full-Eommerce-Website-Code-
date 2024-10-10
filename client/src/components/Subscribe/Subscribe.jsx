import banner from "../../assets/orange-banner.jpg";

const BannerImage = {
  backgroundImage: `url(${banner})`, // Corrected line
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat", // Lowercase 'r' in "backgroundRepeat"
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Subscribe = () => {
  return (
    <div
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white py-20"
      style={BannerImage}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-2xl mx-auto">
          <h1 className="text-2xl text-center sm:text-left sm:text-4xl pb-4 font-semibold ">
            Get Notified About New Products
          </h1>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full p-4 rounded-md border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
             focus:outline-none focus:ring-4 focus:ring-secondary 
             dark:focus:ring-primary-dark shadow-sm transition-all 
             duration-300 ease-in-out hover:shadow-md 
             placeholder-gray-500 dark:placeholder-gray-400"
            aria-label="Email"
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;

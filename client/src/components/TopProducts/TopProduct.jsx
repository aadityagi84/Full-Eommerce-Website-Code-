/* eslint-disable react/prop-types */
import img1 from "../../assets/Products/casul-wear.png";
import img2 from "../../assets/Products/Printed-Shirt.png";
import img3 from "../../assets/Products/Women-Shirt.png";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: img1,
    title: "Casual Wear",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque accusantium magnam, dolorem temporibus a, deleniti maxime sint molestiae debitis accusamus tenetur ullam praesentium rem doloremque eligendi nulla vel ipsam in quae nobis, earum minus? Cumque, sed ad, non ullam eveniet repudiandae atque optio corporis similique pariatur et quidem id!",
  },
  {
    id: 2,
    img: img2,
    title: "Printed Shirt",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque accusantium magnam, dolorem temporibus a, deleniti maxime sint molestiae debitis accusamus tenetur ullam praesentium rem doloremque eligendi nulla vel ipsam in quae nobis, earum minus? Cumque, sed ad, non ullam eveniet repudiandae atque optio corporis similique pariatur et quidem id!",
  },
  {
    id: 3,
    img: img3,
    title: "Women Shirt",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque accusantium magnam, dolorem temporibus a, deleniti maxime sint molestiae debitis accusamus tenetur ullam praesentium rem doloremque eligendi nulla vel ipsam in quae nobis, earum minus? Cumque, sed ad, non ullam eveniet repudiandae atque optio corporis similique pariatur et quidem id!",
  },
  {
    id: 4,
    img: img2,
    title: "Printed Shirt",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil cumque accusantium magnam, dolorem temporibus a, deleniti maxime sint molestiae debitis accusamus tenetur ullam praesentium rem doloremque eligendi nulla vel ipsam in quae nobis, earum minus? Cumque, sed ad, non ullam eveniet repudiandae atque optio corporis similique pariatur et quidem id!",
  },
];

const TopProduct = ({ handleOrderPopued }) => {
  // Correct prop name here
  return (
    <div>
      <div className="container">
        {/* Header Section */}
        <div className="text-left mb-48 ">
          <p className="text-sm text-primary">Top Rated Products for you</p>
          <h1 className="text-3xl font-bold">Best Products</h1>
          <p className="text-xs text-gray-400 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            quibusdam provident vel. Repellendus quibusdam provident vel.
          </p>
        </div>
        {/* Body Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-10 md:grid-cols-4 xl:grid-cols-4 sm:gap-32 gap-48 md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-700 group max-w-[300px] cursor-pointer"
            >
              <div className="h-[100px]">
                <img
                  src={data.img}
                  alt={data.title}
                  className="aspect-square object-cover object-top p-4 mx-w-[140px] block mx-auto transform -translate-y-48 xl:-translate-y-48 md:-translate-y-28 md:gap-40 group-hover:scale-105 duration-700 drop-shadow-md"
                />
              </div>

              {/* details section  */}
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500 dark:group-hover:text-yellow-900" />
                  <FaStar className="text-yellow-500 dark:group-hover:text-yellow-900" />
                  <FaStar className="text-yellow-500 dark:group-hover:text-yellow-900" />
                  <FaStar className="text-yellow-500 dark:group-hover:text-yellow-900" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-700 text-sm line-clamp-2">
                  {data.description}
                </p>
                <button
                  className="bg-primary hover:scale-105 duration-300 text-white py-2 px-6 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={handleOrderPopued} // Correct prop name here
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;

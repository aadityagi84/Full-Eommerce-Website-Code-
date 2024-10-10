/* eslint-disable react/prop-types */
import Image1 from "../../assets/Hero/image1.png";
import Image2 from "../../assets/Hero/image-2.png";
import Image3 from "../../assets/Hero/image-3.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image2,
    title: " Upto 50% off all Mens wear",
    description:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum explicabo aut molestiae obcaecati dolorem sapiente, adipisci voluptatibus aliquam! Et odit quisquam magnam quia nostrum eveniet libero officia",
  },
  {
    id: 2,
    img: Image1,
    title: " Upto 30% off all Women's wear",
    description:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum explicabo aut molestiae obcaecati dolorem sapiente, adipisci voluptatibus aliquam! Et odit quisquam magnam quia nostrum eveniet libero officia",
  },
  {
    id: 3,
    img: Image3,
    title: " 70% off on all Products Sale",
    description:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum explicabo aut molestiae obcaecati dolorem sapiente, adipisci voluptatibus aliquam! Et odit quisquam magnam quia nostrum eveniet libero officia",
  },
];

function Hero({ handleOrderPopued }) {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    pauseOnFocus: true,
    pauseonHover: false,
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center  dark:bg-gray-950 dark:text-white duration-700">
      {/* background-pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"></div>
      {/* hero section  */}

      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((items) => (
            <div key={items.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0  text-center sm:text-left order-2 sm:order-1 px-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                    {items.title}
                  </h1>
                  <p>{items.description}</p>
                  <div>
                    <button
                      onClick={handleOrderPopued}
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-700 py-2 px-4 rounded-full"
                    >
                      Order Now
                    </button>
                  </div>
                </div>

                {/* img content section */}
                <div className="order-1 sm:order-1">
                  <div className="relative z-10 py-4">
                    <img
                      src={items.img}
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 lg:scale-120 object-contain  mx-auto"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Hero;

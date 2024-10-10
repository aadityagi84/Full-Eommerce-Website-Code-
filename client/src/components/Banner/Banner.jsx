import { GrSecure } from "react-icons/gr";
import BannerImg from "../../assets/banner.png";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
const Banner = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="max-w-[1350px] w-[100%] ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 items-center ">
          {/* image section  */}
          <div>
            <div className=" max-w-[500px] h-[380px] pt-2 w-full drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] bg-primary ">
              <img
                src={BannerImg}
                className="mx-auto w-full object-contain  h-full "
                alt=""
              />
            </div>
          </div>
          {/* text-detals-section    */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Winter Sale uptop 50% Off
            </h1>
            <p className="text-sm  text-gray-500 tracking-wide leading-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              inventore magnam veritatis, quidem commodi ipsum rem provident
              optio minima veniam nam dolore minus quasi iste enim beatae
              explicabo id est.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <GrSecure className="text-4xl h-12 w-12  shadow-sm p-4  rounded-full bg-violet-100 dark:bg-violet-400" />
                <p>Quality Products</p>
              </div>
              <div className="flex items-center gap-4">
                <IoFastFood className="text-4xl h-12 w-12  shadow-sm p-4  rounded-full bg-violet-100 dark:bg-violet-400" />
                <p>Fast Delivery</p>
              </div>
              <div className="flex items-center gap-4">
                <GiFoodTruck className="text-4xl h-12 w-12  shadow-sm p-4  rounded-full bg-violet-100 dark:bg-violet-400" />
                <p>Easy Payment method </p>
              </div>
              <div className="flex items-center gap-4">
                <GiFoodTruck className="text-4xl h-12 w-12  shadow-sm p-4  rounded-full bg-violet-100 dark:bg-violet-400" />
                <p>Get Offers </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

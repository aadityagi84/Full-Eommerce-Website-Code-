import Layout from "../Layout/Layout";
import { useSearch } from "../../context/SearchContext";
const apiUrl = import.meta.env.VITE_API_URL;

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values?.results.length < 1
              ? "no Product Found "
              : ` Found ${values?.results.length}`}
          </h6>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2   lg:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  place-items-center gap-4">
          {/* {JSON.stringify(radio, null, 4)} */}
          {/* Dynamic Products */}
          {values?.results.map((data) => (
            <div key={data._id} className="w-[300px] ">
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
                  <button className="bg-primary/80  text-black  py-2 rounded-md">
                    {" "}
                    Add to Cart
                  </button>
                  <button className="bg-gray-700 text-white  py-2 rounded-md">
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

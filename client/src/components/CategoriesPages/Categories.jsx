import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Layout from "../Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  // Add loading or empty state handling
  if (!categories) {
    return (
      <Layout>
        <h1>Loading Categories...</h1>
      </Layout>
    );
  }

  if (categories.length === 0) {
    return (
      <Layout>
        <h1>No Categories Found</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-20 h-[50vh] ">
        <h1 className="text-center  md:px-10 text-2xl   font-semibold  dark:text-white transition-all duration-700">
          All Categories
        </h1>
        <div className=" flex  items-center flex-wrap  gap-4 lg:justify-around justify-center  lg:my-20 my-4">
          {categories.map((data, index) => (
            <button
              key={index}
              className="dark:bg-primary text-white  bg-secondary duration-700 transition-all dark:hover:bg-secondary hover:bg-primary md:w-[auto] w-[90%] py-2 px-4 rounded-md gap-8"
            >
              <Link to={`/categories/${data.slug}`}>{data.name}</Link>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

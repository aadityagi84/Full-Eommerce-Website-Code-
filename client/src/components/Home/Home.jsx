import React, { useState } from "react"; // Correct import for React

import Hero from "../Hero/Hero";

import Products from "../Products/Products"; // Fix typo in "Products"
// import Aos from "aos";
// import "aos/dist/aos.css";
import TopProduct from "../TopProducts/TopProduct";
import Banner from "../Banner/Banner";
import Subscribe from "../Subscribe/Subscribe";
import Testimonials from "../Testimonials/Testimonials";
import { useAuth } from "../../context/Auth";
import Popup from "../PopUp/Popup";
import Layout from "../Layout/Layout";

const Home = () => {
  const [orderPopuped, setOrderPopuped] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleOrderPopued = () => {
    setOrderPopuped(!orderPopuped);
  };
  // React.useEffect(() => {
  //   Aos.init({
  //     offset: 100,
  //     duration: 800,
  //     easing: "ease-in-sine",
  //     delay: 100,
  //   });
  // }, []);
  return (
    <div>
      <div>
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}

        <Layout handleOrderPopued={handleOrderPopued}>
          <Hero handleOrderPopued={handleOrderPopued} />
          <Products />
          <TopProduct handleOrderPopued={handleOrderPopued} />
          <Banner />
          <Subscribe />
          {/* <Products /> */}
          <Testimonials />

          <Popup
            orderPopuped={orderPopuped}
            setOrderPopuped={setOrderPopuped}
          />
        </Layout>
      </div>
    </div>
  );
};

export default Home;

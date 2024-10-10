/* eslint-disable react/prop-types */
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
function Layout({ children, handleOrderPopued }) {
  return (
    <div>
      <Navbar handleOrderPopued={handleOrderPopued} />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
}

export default Layout;

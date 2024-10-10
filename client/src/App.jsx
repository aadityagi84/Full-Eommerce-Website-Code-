import { Routes, Route, Navigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import NotFoundPage from "./components/PageNotFound/NotFoundPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./User/Dashboard";
import Private from "./Routes/Private";
import ForgotPassword from "./components/Auth/ForgotPassword";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CreateCategory from "./components/Admin/CreateCategory";
import CreateProducts from "./components/Admin/CreateProducts";
import Users from "./components/Admin/Users";
import { useAuth } from "./context/Auth";
import Order from "./components/User/Order";
import Profile from "./components/User/Profile";
import Products from "./components/Admin/Products";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Search from "./components/SearchPage/Search";
import ProductDetails from "./components/All Products Details/ProductDetails";
import Categories from "./components/CategoriesPages/Categories";
import CategoriesList from "./components/CategoriesPages/CategoriesList";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [auth] = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/categories/:slug" element={<CategoriesList />} />
        {/* Private Route to secure all of the user dashboard */}
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        {/* ========================================================= */}
        {/* Private Route for admin dashboard */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />

          <Route path="admin/products" element={<Products />} />

          <Route path="admin/users" element={<Users />} />
          <Route path="admin/create-product" element={<CreateProducts />} />
        </Route>
        {/* ================================================================================ */}

        <Route
          path="/login"
          element={auth.token ? <Navigate to="/" /> : <Login />}
        />

        {/* ========= */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;

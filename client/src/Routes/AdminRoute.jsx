import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
const apiUrl = import.meta.env.VITE_API_URL;
const AdminRoute = () => {
  const [ok, setok] = useState(false);
  const [auth, setAuth] = useAuth();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authcheck = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/v1/auth/admin-auth`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        // console.log("API response:", res.data);
        if (res.data.ok) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Authentication failed", error);
          setok(false);
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) authcheck();
  }, [auth?.token]);

  return isLoading ? (
    <Loader path={""} /> // Redirect to the login page
  ) : ok ? (
    <Outlet /> // Render protected content if authorized
  ) : (
    <div>
      <Loader path={""} />
    </div>
  );
};
export default AdminRoute;

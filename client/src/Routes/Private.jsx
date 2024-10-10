import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
const apiUrl = import.meta.env.VITE_API_URL;
const Private = () => {
  const [ok, setok] = useState(false);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authcheck = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/v1/auth/user-auth`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        console.log("API response:", res.data);
        if (res.data.ok) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {
        console.error("Authentication failed", error);
        setok(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) authcheck();
  }, [auth?.token]);

  return loading ? (
    <Loader path="/login" />
  ) : ok ? (
    <Outlet />
  ) : (
    <div>Not authorized</div>
  );
};
export default Private;

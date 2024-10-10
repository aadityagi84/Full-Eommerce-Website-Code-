import { useLocation, useNavigate } from "react-router-dom";
import "./Loader.css"; // Import the CSS file
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Loader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((val) => --val);
    }, 1000);

    count === 0 && navigate("/login", { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="parentSpinner flex-col">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <h1 className="text-2xl text-primary dark:text-white text-center">
        Please wait Redirecting you in {count} seconds
      </h1>
    </div>
  );
};

export default Loader;

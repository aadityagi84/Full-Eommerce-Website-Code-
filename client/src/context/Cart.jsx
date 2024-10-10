import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exisitingCartItem = localStorage.getItem("cart");
    if (exisitingCartItem) setCart(JSON.parse(exisitingCartItem));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

import { createContext, useState, useEffect, useContext } from "react";

const cartContext = createContext();
const CART_KEY = "cart";


export const CartProvider = ({ children }) => {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart);

  useEffect(() => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cartItems)
    );
  }, [JSON.stringify(cartItems)]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  const removeFromCart = foodId => {
    const filteredCartItems = cartItems.filter(item => item.id !== foodId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQauntity) => {
    const { food } = cartItem;
    
    const changedCartItem = {
      ...cartItem,
      quantity: newQauntity,
     totalPrice: cartItem.price * newQauntity,
    };

    setCartItems(
      cartItems.map(item => (item.id === cartItem.id ? changedCartItem : item))
    );
  };

  const addToCart = food => {
    const cartItem = cartItems.find(item => item.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1, price: food.price }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    setCartItems([]);
  };

  return <cartContext.Provider  value={[
     cartItems ,
    removeFromCart,
    changeQuantity,
    addToCart,
    clearCart
  ]}>
    {children}
  </cartContext.Provider>;
};
// custom hook
export const useCart = () => useContext(cartContext);

///export { useCart, CartProvider };

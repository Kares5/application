import { createContext, useState, useEffect, useContext } from "react";

const cartContext = createContext();
const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);

  useEffect(() => {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
      })
    );
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const removeFromCart = foodId => {
    const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQauntity) => {
    const { food } = cartItem;

    const changedCartItem = {
      ...cartItem,
      quantity: newQauntity,
      price: food.price * newQauntity,
    };

    setCartItems(
      cartItems.map(item => (item.food.id === food.id ? changedCartItem : item))
    );
  };

  const addToCart = food => {
    const cartItem = cartItems.find(item => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    const { items } = EMPTY_CART;
    setCartItems(items);
  };

  return <cartContext.Provider  value={{
    cart: { items: cartItems },
    removeFromCart,
    changeQuantity,
    addToCart,
    clearCart,
  }}>
    {children}
  </cartContext.Provider>;
};
// custom hook
export const useCart = () => useContext(cartContext);

///export { useCart, CartProvider };

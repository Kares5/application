import { createContext, useState, useEffect, useContext } from 'react';

const cartContext = createContext()

const CartProvider = ({children}) => {
    const [cart , setCart] = useState([])

    const addToCart = (item) => {
        let CartItem = localStorage.getItem('cart')      
        if(CartItem) setCart(JSON.parse(CartItem))
        
    }
    
    useEffect( () => {
        addToCart()
    } , [])

    return (
        <cartContext.Provider value={[cart , setCart] }>
            {children}
        </cartContext.Provider>
    )
}
// custom hook
const useCart = () => useContext(cartContext)

export {useCart , CartProvider}


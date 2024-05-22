import { createContext, useState, useEffect, useContext } from 'react';

const favoriteContext = createContext()

const FavoriteProvider = ({children}) => {
    const [favorite , setfavorite] = useState([])

    const addTofavorite = (item) => {
        let favoriteItem = localStorage.getItem('favorite')      
        if(favoriteItem) setfavorite(JSON.parse(favoriteItem))
        
    }
    
    useEffect( () => {
        addTofavorite()
    } , [])

    return (
        <favoriteContext.Provider value={[favorite , setfavorite]}>
            {children}
        </favoriteContext.Provider>
    )
}
// custom hook
const useFavorite = () => useContext(favoriteContext)

export {useFavorite , FavoriteProvider}
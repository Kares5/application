import React from 'react'
import styles from './favorite.module.css'
import Layout from './../Layout';
import { useFavorite } from '../../context/favorite';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';




const Favorite = () => {
    const [favorite , setfavorite] = useFavorite([])
    const navigate = useNavigate()


    const removeCartItem = (pid) => {
        try {
            let myfav = [...favorite];
            let index = myfav.findIndex((item) => item._id === pid);
            myfav.splice(index, 1);
            setfavorite(myfav);
            localStorage.setItem("favorite", JSON.stringify(myfav));
          } catch (error) {
            console.log(error);
          }
    }
  return (
    <Layout>
    <div className={styles.cotainerCart}>
        {favorite.map ((p) => (
            <div className={styles.Singleproduct}>
            <div className={styles.imageProduct}>
                <img src={`https://mern1-rpok.onrender.com/api/product/product-photo/${p._id}`}alt = {p.name}/>

                <div className={styles.heartIcon} onClick={ () => removeCartItem(p._id)}>
                    <i className='bi bi-trash'></i>
                </div>

            </div>
            <div className={styles.productBody}>
              <h2>Name : {p.name}</h2>
              <p>Description : {p.description.substring(0 , 30)}</p>
              <div>Price : ${p.price}  </div>
     
              <button onClick={() => navigate(`/product/${p.slug}`)}>See More</button>
            </div>
          </div>
        ))}
    </div>
    <div className={styles.order} onClick={() => navigate('/')}>Go To Home</div> 

</Layout>
  )
}

export default Favorite

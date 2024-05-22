import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './productDetails.module.css'
import { toast } from 'react-toastify';
import { useCart } from '../../context/cart';

const ProductDetails = () => {
  const params = useParams()
  const [product , setProduct] = useState({})
  const [cart , setCart] = useCart([])
  const [ relatedProduct , setRelatedProduct] = useState([])

  useEffect( () => {
    if(params.slug)  getProduct()
  }, [params.slug])

  // get product
  const getProduct = async () => {
    try {
      const {data} = await axios.get(`http://localhost:5000/api/product/get-product/${params.slug}`)
      setProduct(data.product)
      getSimilarProduct(data.product._id , data.product.category._id)
    } catch (error) {
      console.log(error);
    }
  }

  const getSimilarProduct = async (pid , cid) => {
    try {
      const {data} = await axios.get(`http://localhost:5000/api/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data.products)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
        <div className={styles.Singleproduct} >
          <div className={styles.imageProduct}>
            <img src={`http://localhost:5000/api/product/product-photo/${product._id}`} alt = {product.name}/>     
          </div>
          <div className={styles.productBody}>
            <h2> {product.name}</h2>
            <p> {product.description}</p>
            <div>${product.price}</div>
            <h4>Category : {product.category?.name}</h4>

            <div className={styles.cartIcon} onClick={() =>{
              setCart ([...cart , product ]); localStorage.setItem('cart' ,                   
              JSON.stringify([...cart , product ])); toast.success('Item added to cart successfully') }}>
             Add To Cart
            </div>
          </div>
      </div>
      <div>
      {relatedProduct.length < 1 && (<p>NO Similar Product Found</p>)}
      <div className={styles.relatedProduct}>
      <h2 style={{marginLeft : '3rem'}}> Related Product</h2>
              {relatedProduct.map(p => (
                <div className={styles.SingleRelated} key={p._id}>
                  <div className={styles.Relatedimage}>
                    <img src={`http://localhost:5000/api/product/product-photo/${p._id}`} alt = {p.name}/>     
                  </div>

                  <div className={styles.RelatedBody}>
                    <h5 >{p.name}</h5>
                    <p >{p.description.substring(0 , 30)}</p>
                    <div >$ {p.price}</div>
                  </div>
                </div>
                
                
              ))}
        </div>
      </div>

    </Layout>
  )
}

export default ProductDetails

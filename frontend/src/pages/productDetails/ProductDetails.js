import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './productDetails.module.css'

const ProductDetails = () => {
  const params = useParams()
  const [product , setProduct] = useState({})
  const [ relatedProduct , setRelatedProduct] = useState([])
  const navigate = useNavigate()

  useEffect( () => {
    if(params.slug)  getProduct()
  }, [params.slug])

  // get product
  const getProduct = async () => {
    try {
      const {data} = await axios.get(`https://mern1-rpok.onrender.com/api/product/get-product/${params.slug}`)
      setProduct(data.product)
      getSimilarProduct(data.product._id , data.product.category._id)
    } catch (error) {
      console.log(error);
    }
  }

  const getSimilarProduct = async (pid , cid) => {
    try {
      const {data} = await axios.get(`https://mern1-rpok.onrender.com/api/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data.products)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
        <div className={styles.Singleproduct} >
          <div className={styles.imageProduct}>
            <img src={`https://mern1-rpok.onrender.com/api/product/product-photo/${product._id}`} alt = {product.name}/>     
          </div>
          <div className={styles.productBody}>
            <h2> {product.name}</h2>
            <p> {product.description}</p>
            <div>${product.price}</div>
            <h4>Category : {product.category?.name}</h4>

            <div className={styles.cartIcon} onClick={() => navigate('/')}>
            Go To Home
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
                    <img src={`https://mern1-rpok.onrender.com/api/product/product-photo/${p._id}`} alt = {p.name}/>     
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

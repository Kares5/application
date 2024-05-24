import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './categoryProduct.module.css'

const CategoryProduct = () => {
    const [products , setProducts] = useState([])
    const [category , setcategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect( () => {
        if(params.slug) getProductByCat()
    }, [params.slug])

    const getProductByCat = async () => {
        try {
            const {data} = await axios.get(`https://mern1-rpok.onrender.com/api/product/product-category/${params.slug}`)
            setProducts(data.products)
            setcategory(data.category)
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
       <div className={styles.titleProductCat}>
        <h4>Category - {category.name}</h4>
        <h6 className='text-center'>{products.length} result found</h6>
       </div>
        <div className={styles.productsCategoryContainer}>      
            {products.map(p => (
                <div className={styles.singelCategoryContainer}>
                    <div className={styles.imgCategory}>
                        <img src={`https://mern1-rpok.onrender.com/api/product/product-photo/${p._id}`} alt = {p.name}/> 
                    </div>
                    <div className={styles.bodyproductCat}>
                    <h3> {p.name}</h3>
                    <p> {p.description.substring(0 , 30)}</p>
                    <p>${p.price}</p>
                    <button  onClick={() => navigate(`/product/${p.slug}`) }>More Details</button>
                </div>
                </div>  
                ))}
        </div>
    
    </Layout>
  )
}

export default CategoryProduct

import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import AdminMunue from './AdminMunue';
import styles from './admin.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const [categories, setCategories] = useState([])
  const [name , setName] = useState('')
  const [description , setDescription] = useState('')
  const [price , setPrice] = useState('')
  const [category , setCategory] = useState('')
  const [photo , setPhoto] = useState('')


  const [products , setProducts] = useState([])

  const navigate = useNavigate()

  const getCategories = async () => {
    try {
        const {data} = await axios.get('http://localhost:5000/api/category/get-category')
        setCategories(data.category)
    } catch (error) {
        console.log(error)
    }
}
useEffect ( () => {
  getCategories()
}, [])
const handleCreate = async (e) => {
  e.preventDefault()
  try {
    const productData = new FormData()
    productData.append('name' , name)
    productData.append('description' , description)
    productData.append('price' , price)
    productData.append('photo' , photo)
    productData.append('category' , category)
    const {data} = axios.post('http://localhost:5000/api/product/create-product', productData )
    if(data?.success) {
      toast.error(data?.message)
    }else{
      toast.success("Product Created Successfully")
      navigate('/')
    }
    
  } catch (error) {
    console.log(error)
    toast.error('something went wrong')
  }
}

  // all products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/api/product/get-product')
      setProducts(data.products)
      
    } catch (error) {
      console.log(error)
      toast.error('Someting Went Wrong')
    }
  }
  useEffect( () => {
    getAllProducts()
  },[])

  return (
    <Layout title={'Dashboard - Create Product'}>
      <AdminMunue />
      <h3>Create Product</h3>
      <div className={styles.createProductForm}>
        <label >
          {photo ? photo.name : "Upload Photo"}  
         <input type='file' name='photo' accept='image/*' onChange={ (e) =>setPhoto(e.target.files[0])} />
        </label>
        {photo && (
          <img src={URL.createObjectURL(photo)} alt='product' height={'200px'}  />
          )}
          
         <div className={styles.productFormBody}>
            <div className={styles.fieldProduct}>
              <input type='text' value={name} onChange={ (e) => setName(e.target.value)} placeholder='name'/>
            </div>
            <div className={styles.fieldProduct}>
              <textarea type='text' value={description} placeholder=' description' onChange={(e) =>setDescription(e.target.value) }/>
            </div>

            <div className={styles.fieldProduct}>
              <input type='number' value={price} placeholder='Price' onChange={(e) =>setPrice(e.target.value) }/>
            </div>


            <div  className={styles.fieldProduct}>
              <select className={styles.fieldProduct}  onChange={(e) => setCategory(e.target.value)}>
              {categories.map( (c) => (
                <option  key={c._id} value={c._id}>
                {c.name}
                </option>
              ))}

            </select>
            </div>
          
            
            <div className={styles.fieldProduct} >
              <button onClick={handleCreate} > Create Product</button>
            </div>
         </div>
        </div>
        <h2 className={styles.ProductLength}>we have {products.length} products</h2>
        <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>photo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.description.substring(0 , 30)}</td>
                    <td>{p.price}</td>
                    <td className={styles.imgProduct}>
                      <img src={`http://localhost:5000/api/product/product-photo/${p._id}`} alt= {p.name}/>
                    </td>
                    <td>
                        <Link to={`/dashboard/admin/products/${p.slug}`}>
                          <i className='bi bi-pencil-fill'></i>
                          <i className='bi bi-trash'></i>
                        </Link>
                      
                    </td>                
                  </tr>
                ))}
              </tbody>
        </table>
       
    </Layout>
  )
}

export default Products

import React, { Fragment, useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import AdminMunue from './AdminMunue';
import { Link } from 'react-router-dom';
import styles from './admin.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate()
  const [categories , setCategories] = useState([])
  const [name , setName] = useState('')
  const [updatedName, setUpdatedName] = useState('')
  const [selected , setSelected] = useState(null)
  const [openModal , setOpenModel] = useState(false)



  const getCategories = async () => {
    try {
        const {data} = await axios.get('https://mern1-rpok.onrender.com/api/category/get-category')
        setCategories(data.category)
    } catch (error) {
        console.log(error)
    }
}
useEffect( () => {
  getCategories()
}, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('https://mern1-rpok.onrender.com/api/category/create-category' ,{name})
     if(data.success) {
      toast.success(`${name} is Created successfully`)
      getCategories()
      setName('')
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in input form')
    }
  } 
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data} = await axios.put(`https://mern1-rpok.onrender.com/api/category/update-category/${selected._id}` , {name : updatedName})
      if(data.success) {
        toast.success(`${updatedName} successfully updated`)
        setUpdatedName('')
        setSelected(null)
        setOpenModel(false)
        getCategories()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in input form')
    }
  }
  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`https://mern1-rpok.onrender.com/api/category/delete-category/${id}`)
     if (data.success){
      toast.success('Category deleted successfully')
      window.location.reload()      
     }else{
      toast.error(data.message)
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  }
  return (
    <Layout>
      <AdminMunue />
      <form className={styles.CreateCategoryForm} onSubmit={handleSubmit}>
      <input required value={name } onChange={ (e) => setName(e.target.value)}/>
      <label className={styles.labelCategoryName}>Name Category</label>
        <button type='submit'>Create</button>
      </form>
      <h3 className={styles.CategoriesLength}> we Have {categories.length} categories</h3>
 
        <div className={styles.categoryContainer}>
          <div className={styles.nameCategoryContainer}>
        {categories.map( c => (
              <div key={c._id} className={styles.singleCategoryContaner}>
                <Link   to={c.slug} className={styles.category} >{c.name}
                </Link>
                <span className={styles.UpdateCategortIcon}>
                    <i className='bi bi-pencil-square' onClick={() => {setSelected(c) ; setOpenModel(true) ; setUpdatedName(c.name)} } >
                    {openModal && 
                    <div onClick={() => setOpenModel(false)} className={styles.modelContainer}>
                      <div onClick={ (e) => e.stopPropagation()}  className={styles.modelContent}>
                        <i onClick={ () => setOpenModel(false)} className='bi bi-x-circle-fill'></i>
                          <form className={styles.uodateCategoryForm} onSubmit={handleUpdate} >
                            <input required value={updatedName} name='j' onChange={ (e) => setUpdatedName(e.target.value)}/>
                            <button type='submit'>Update </button>
                          </form> 
                      </div>
                    </div>
                    }
                  </i>
                </span>
                <span className={styles.DeleteCategoryIcon}>
                  <i onClick={() => {deleteHandler(c._id)}} class="bi bi-trash"></i>  
                </span>
                
              </div>
            ))}
            </div>
           
          </div>
    </Layout>
  )
}

export default Categories

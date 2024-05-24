import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import styles from './user.module.css'
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserMenue from './UserMenue';

const ProfileUser = () => {
    const [auth , setAuth] = useAuth()
    const navigate = useNavigate()
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [phone , setPhone] = useState('')
    const [address , setAddress ] = useState('')
    // get data from local storage
    useEffect( () => {
        const {name , email ,  phone , address} = auth?.existingUser
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth?.existingUser])
    // update function
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const {data} = await axios.put('https://mern1-rpok.onrender.com/api/auth/profile' , {name , email , phone , address , password})
    if (data.error) {
      toast.error(data.error)
    }else {
      // update set auth (in local storage) with updateUser from backend
      setAuth({...auth , existingUser : data.updateUser})
      // ls == local storage
      let ls = localStorage.getItem('auth')
      // change string ( ls ) to js so we can give it anew data
      ls = JSON.parse(ls)
      ls.existingUser = data.updateUser
      localStorage.setItem('auth', JSON.stringify(ls))
      toast.success('Profile Updated Successfully')
    }

  } catch (error) {
    console.log(error)
    toast.error('somthing went wrong')
  }
}

  return (
    <Layout>
    <UserMenue />
    <div className={styles.wrapper}>
    <form onSubmit={handleSubmit} >
      <h4 className={styles.title}> Profile</h4>
          <div className={styles.field} >
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            <label>Name 😎</label>
          </div>
          <div className={styles.field} >
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Email 📧</label>
          </div>
          <div className={styles.field} >
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label>Password 🔑</label>
          </div>
          <div className={styles.field} >
            <input type="number" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <label>phone 📞</label>
          </div>
          <div className={styles.field} >
            <input type="text" required  value={address} onChange={(e) => setAddress(e.target.value)}/>
            <label>address 🏠</label>
          </div>
          <button type="submit" > Update </button>
      </form>
    </div>
        
    </Layout>
  )
}

export default ProfileUser

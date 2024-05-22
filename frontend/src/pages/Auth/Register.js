import React, { useState } from 'react'
import Layout from '../../components/Layout';
import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
const Register = () => {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [phone , setPhone] = useState('')
  const [address , setAddress ] = useState('')
  const [answer , setAnswer] = useState('')
  const navigate = useNavigate()

  const handleSubit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register' , {
        name , email , password , phone , address , answer
      })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate('/login')
      }else {
        toast.error(res.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }
  return (
    <Layout title='Delivery Restaurant-Register' >
      <div className={styles.wrapper}>
      <form onSubmit={handleSubit}>
        <h4 className={styles.title}> Register Form</h4>
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
            <div className={styles.field} >
              <input type="text" required value={answer} onChange={(e) => setAnswer(e.target.value)}/>
              <label>My Favourite Food Is 😋</label>
            </div>
            <button type="submit" > Submit </button>
            <span>Already have accound so :</span>
            <Link to='/login'>LOGIN </Link>
        </form>
      </div>
    </Layout>
  )
}

export default Register

import React, { useEffect, useState } from 'react'
import styles from './auth.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate  } from 'react-router-dom'
import {useAuth} from '../../context/auth'
import Layout from './../../components/Layout';

const Login = () => {
    const navigate = useNavigate()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const [auth , setAuth] = useAuth()
    

    const handleSubit = async(e) => {
        e.preventDefault()
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login' , { email , password })
          if (res && res.data.success) {
            toast.success(res.data && res.data.message)
            // every changes on auth context we need to write :...auth ,
            setAuth({...auth , user : res.data.existingUser , token : res.data.token })
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate('/')
            window.location.reload()
          }else {
            toast.error(res.data.message)
          }
          
        } catch (error) {
          console.log(error)
          toast.error('something went wrong')
        }
      }

  return (
    <Layout title='Delivery Restaurant-Login' >
        <div className={styles.wrapper}>
            <form onSubmit={handleSubit}>
                <h4 className={styles.title}> Login Form</h4>
                <div className={styles.field} >
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Email 📧</label>
                </div>
                <div className={styles.field} >
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label>Password 🔑</label>
                </div>
                <button type="submit" > Submit </button>
                <span>Forgot Password :</span>
                <Link to='/forgot-password'>Remember me</Link>
            </form>
        </div>
    </Layout>
  )
}

export default Login

import React, { useState } from 'react'
import styles from './auth.module.css'
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from './../../components/Layout';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email , setEmail] = useState('')
    const [newPassword , setNewPassword] = useState('')
    const [answer , setAnswer] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
          const res = await axios.post('http://localhost:5000/api/auth/forgot-password' , { email , newPassword , answer})
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
    <Layout title='Delivery Restaurant-Forgot Password'>
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
            <h4 className={styles.title}>Forgot Password</h4>
            <div className={styles.field} >
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Email 📧</label>
            </div>
            <div className={styles.field} >
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <label>Password 🔑</label>
            </div>
            <div className={styles.field} >
                <input type="text" required value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                <label>My Favourite Food Is 😋</label>
            </div>
            <button type="submit" > Submit </button>
            </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword

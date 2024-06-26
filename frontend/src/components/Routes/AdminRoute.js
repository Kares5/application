import  { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import {Outlet} from 'react-router-dom'


export default function AdminRoute () {
    const [ok , setOk] = useState(false)
    const [auth , setAuth] = useAuth()
    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get('https://mern1-rpok.onrender.com/api/auth/admin-auth')
            if(res.data.ok) {
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck() 
    } , [auth?.token])
  return ok ? <Outlet /> : 'You Should Login and be Admin First'}

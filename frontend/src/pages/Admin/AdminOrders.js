import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Layout from './../../components/Layout';
import AdminMunue from './AdminMunue';
import styles from './admin.module.css'
import moment from 'moment'
import { toast } from 'react-toastify';
import {Select} from 'antd'

const AdminOrders = () => {
     // كون الستاتس من لما عرفتا بالاوردر مودل كانت عبارة عن اراي من النم
     const [status , setStatus] = useState(['Not Process' , "Payed" , "Delivered" , "Cancelled"])
     const [orders , setOrders] = useState([])
     const [auth , setAuth] = useAuth()

     const getOrders = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/api/auth/all-orders')
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
     }
     useEffect( () => {
        if(auth?.token) getOrders()
     }, [auth?.token])


     const handleChange = async (orderId , value)=>{
        try {
            const {data} = await axios.put(`http://localhost:5000/api/auth/order-status/${orderId}` , {status : value} )
            toast.success('order status updated successfully')
            getOrders()
        } catch (error) {
            console.log(error);
        }
     };
     console.log(status)

  return (
    <Layout>
        <AdminMunue />
        <div className={styles.OrdersContainer}>
            
                <div className={styles.singleOrder}>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Buyer</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Quantity</th>
                            </tr>
                        </thead>
                        {orders.map((o , i) => (
                        <tbody>
                            <tr>
                                <td>{i + 1}</td>
                                <td>
                                    <Select style={{color : "black"}} className={styles.select}
                                    defaultValue={o.status}                                    
                                    onChange={(value ) => handleChange(o._id ,  value)}>
                                    {status.map( (s , i) => (
                                    <Select.Option key={i} value={s}> {s} </Select.Option>
                                    ))}       
                                    </Select>
                                </td>
                                <td>{o.buyer.name}</td>
                                <td>{moment(o.createdAt).fromNow()}</td>
                                <td>{o.products.length}</td>
                            </tr>
                        </tbody>
                    ))}
                    </table>           
                </div>
        </div>
    </Layout>
  )
}

export default AdminOrders
// <div className={styles.orderContent}>
// {o.products.map((p , i) => (
//     <div className={styles.singelCategoryContainer}>
//     <h2>{ i + 1} </h2>
//     <div className={styles.imgCategory}>
//         <img src={`http://localhost:5000/api/product/product-photo/${p._id}`} alt = {p.name}/> 
//     </div>
//     <div className={styles.bodyproductCat}>
//     <h3>Name : {p.name}</h3>
//     <p>Description : {p.description.substring(0 , 30)}</p>
//     <p>Price : ${p.price}</p>
// </div>
// </div> 
// ))}
// </div>
import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import UserMenue from './UserMenue';
import styles from './user.module.css'
import moment from 'moment'



const UserOrders = () => {
    const [orders , setOrders] = useState([])
    const [auth , setAuth]= useAuth()

    const getOrders = async() => {
        try {
            const {data} = await axios.get('http://localhost:5000/api/auth/orders')
            setOrders(data)
        } catch (error) {
            console.log(error);
        }
    } 
    useEffect( () => {
        if (auth?.token) getOrders()
    } , [auth?.token])
  return (
    <Layout  title={'Your Orders'}>
        <UserMenue />
        <div className={styles.orderContainer}>
                <div className={styles.Singleorder}>
                    <table >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Buyer</th>
                                <th>Date</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map((o , i) => (
                            <tr>
                                <td>{i + 1}</td>
                                <td>{o.status}</td>
                                <td>{o.buyer.name}</td>
                                <td>{moment(o.createdAt).fromNow()}</td>
                                <td>{o.products.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
              
                </div>
          
          
        </div>
    </Layout>
  )
}

export default UserOrders
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
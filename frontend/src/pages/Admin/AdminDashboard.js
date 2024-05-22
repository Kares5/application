import React from 'react'
import Layout from './../../components/Layout';
import { useAuth } from '../../context/auth';
import styles from './admin.module.css'
import AdminMunue from './AdminMunue';

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <h2 className={styles.adminName}>Hi Admin :  {auth.existingUser.name} </h2>
        <AdminMunue />
    </Layout>
  )
}

export default AdminDashboard

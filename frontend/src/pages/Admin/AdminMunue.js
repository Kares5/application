import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './admin.module.css'

const AdminMunue = () => {
  const [toggel , setToggel] = useState(false)
  return (
    <div className={styles.containerAdminMenu}>
      <h3 className={styles.titleDashboard} onClick={() => setToggel(!toggel)} >
      Dashboard
      <i className='bi bi-arrow-down-short'></i>
      </h3>
      <div className={styles.menue} style={{ display : toggel && 'block'}} >
        <Link to='/dashboard/admin/profile'> Profile </Link>
        <Link  to='/dashboard/admin/users'> All Users</Link>
        <Link  to='/dashboard/admin/categories'>  All Categories</Link>
        <Link to='/dashboard/admin/products' > Products</Link>
        <Link to='/dashboard/admin/orders'> Orders </Link>
      </div>
  </div>
  )
}

export default AdminMunue

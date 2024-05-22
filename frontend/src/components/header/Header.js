import React, { Fragment, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import styles from './header.module.css'
import DarkMode from './../DarkMode/DarkMode';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import { useFavorite } from '../../context/favorite';

const Header = () => {
  const [toggel, setToggel] = useState(false)
  const [auth , setAuth] = useAuth()

 const handleLogout = () => {
   // every changes on auth context we need to write :...auth ,
  setAuth({...auth , existingUser: null , token : ''})
  localStorage.removeItem('auth')
  toast.success('Logout Successfully')
 }

 const [cart] = useCart([])
 const [favorite] = useFavorite([])

  return (
    <div className={styles.header}>
      <Link to= '/' className={styles.logo}>
        <img src='/favicon.ico' alt='logo' className={styles.logoImg} />
        <div  className={styles.logoText}>
          <b>DELIVERY</b>
          <br />
          <b>RESTAURANT</b>
        </div>
      </Link>
      <DarkMode />
        <ul className={styles.list} style={{ top: toggel && "13vh" }}>
          <li>
            <Link to= '/' onClick={() => setToggel(false)}>
              <img src='/Home.ico' alt='logo' />
              Home
            </Link>
          </li>
           {!auth.existingUser ?
             (
              <li>
              <Link to= '/register'>
                <img src='/login.ico' alt='logo' />
                Sign In
              </Link>
            </li>) : (
              <Fragment>            
                <li>
                  <Link to= '/login' onClick={handleLogout } >
                    <img src='/login.ico' alt='logo' />
                    Log out
                  </Link>
                </li>
                <li>
                  <Link to={`/dashboard/${auth.existingUser.role === 1 ? 'admin' : 'user'}`}onClick={() => setToggel(false)}>
                    <img src='/dashboard.ico' alt='logo' /> Dashboard
                  </Link>
                </li>
              </Fragment>
            )}
          <li>
            <Link to='/favorites' onClick={() => setToggel(false)}>
            {favorite.length > 0 && <span className={styles.favoriteLength}>{favorite.length}</span> }
              <img src='/favorite.ico' alt='logo' />
              Favorite
            </Link>
          </li>    
          <li>
            <Link to='/cart' onClick={() => setToggel(false)}>
             {cart.length > 0 &&  <span className={styles.cartLength}>{cart.length}</span>}
              <img src='/Cart.ico' alt='logo' />
              Cart
            </Link>
          </li> 

        </ul>
        <div onClick={ () => setToggel(prev => !prev) } className={styles.menue}>
          {toggel ? <img src='/close.ico' alt='close'/> : <img src='/list.ico' alt='list' /> }
        </div>
    </div>
  )
}

export default Header

import React, { useEffect, useState } from "react";
import Layout from "./../Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const naviate = useNavigate();
  const { cart, removeFromCart,  clearCart } =
    useCart();

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      ///setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart.items.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };


  // handleCreate
  const handleCreate = async () => {
    try {
      const {data} = await axios.post('http://localhost:5000/api/product/create-order' , { cart})
      localStorage.removeItem("cart");
      //setCart([])
      clearCart();
      toast.success("Create Order Completed Successfully")
      naviate("/");
    } catch (error) {
      console.log(error)
    }
  };
  console.log((cart.items));
  return (
    <Layout>
    <h4 className={styles.cartLength}>
        {cart.length > 0 && `You have ${cart.length} items in your cart `}
    </h4>
      <div className={styles.cotainerCart}>
        {cart.items.map((p) => (
          <div className={styles.Singleproduct}>
            <div className={styles.imageProduct}>
              <img
                src={`http://localhost:5000/api/product/product-photo/${p.food.id}`}
                alt={p.food.name}
              />

              <div className={styles.heartIcon}>
                <i className="bi bi-heart-fill"></i>
              </div>

              <div className={styles.cartIcon}>
                <i
                  onClick={() => removeFromCart(p.food._id)}
                  className="bi bi-trash"
                ></i>
              </div>
            </div>
            <div className={styles.productBody}>
              <h2>Name : {p.food.name}</h2>
              <p>Description : {p.food.description.substring(0 , 30)}</p>
              <div>Price : ${p.price} </div>

              <button onClick={() => naviate(`/product/${p.food.slug}`)}>
                See More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <h2 className={styles.totalPrice}>Total : {totalPrice()}</h2>
          <div className={styles.order} onClick={handleCreate}>Make Order</div> 
      </div>
    </Layout>
  );
};

export default Cart;

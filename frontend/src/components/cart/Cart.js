import React, { useEffect, useState } from "react";
import Layout from "./../Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

const Cart = () => {
  const naviate = useNavigate();
  const [auth] = useAuth();
  const { cart, removeFromCart, changeQuantity, addToCart, clearCart } =
    useCart();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

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

  // ======== get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:5000/api/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      //setCart([])
      clearCart();
      naviate("/");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };
  console.log((cart.items));
  return (
    <Layout>
      <h4 className={styles.cartLength}>
        {cart.items.length
          ? `You have ${cart.items.length} items in your cart ${
              auth.token ? "" : "Please login to checkout"
            } `
          : "Your cart is empty"}
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
              <p>Description : {p.food.description}</p>
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
        {auth?.user?.address ? (
          <div>
            <h4>Current Address : {auth.user.address}</h4>
            <button onClick={() => naviate("/dashboard/user/profile")}>
              Update Address
            </button>
          </div>
        ) : (
          <div>
            {auth.token ? (
              <button onClick={() => naviate("/dashboard/user/profile")}>
                Update Address
              </button>
            ) : (
              <button onClick={() => naviate("/login", { state: "/cart " })}>
                Please Login to checkout
              </button>
            )}
          </div>
        )}
        {!clientToken | !cart.length ? (
          ""
        ) : (
          <div>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: { flow: "vault" },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button onClick={handlePayment}>
              {loading ? "Processing ...." : "Make Payment "}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

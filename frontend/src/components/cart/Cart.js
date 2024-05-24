
import Layout from "./../Layout";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const naviate = useNavigate();
  const [ cart, removeFromCart, changeQuantity ,clearCart  ] =
    useCart();

  const totalPrice = () => {
    try {
      let total = 0;
      if(cart) {
        cart.map((item) => {
          total = total + item.totalPrice ? item.totalPrice : item.price
         })
      }   
      return total;
    } catch (error) {
      console.log(error);
    }
  };


  // handleCreate
  const handleCreate = async () => {
    try {
      const {data} = await axios.post('https://mern1-rpok.onrender.com/api/product/create-order' , {cart})
      localStorage.removeItem("cart");
      //setCart([])
      clearCart();
      toast.success("Create Order Completed Successfully")
      naviate("/");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Layout>
    <h4 className={styles.cartLength}>
        {(cart.length ) > 0 && `You have ${cart.length} items in your cart `}
    </h4>
      <div className={styles.cotainerCart}>
         {cart?cart.map((p) => (
          <div className={styles.Singleproduct} key={p._id}>
            <div className={styles.imageProduct}>
              <img
                src={`https://mern1-rpok.onrender.com/api/product/product-photo/${p.id}`}
                alt={p.name}
              />

              <div className={styles.heartIcon}>
                <i className="bi bi-heart-fill"></i>
              </div>

              <div className={styles.cartIcon}>
                <i
                  onClick={() => removeFromCart(p._id)}
                  className="bi bi-trash"
                ></i>
              </div>
            </div>
            <div className={styles.productBody}>
              <h2>Name : {p.name}</h2>
              <p>Description : {p.description.substring(0 , 30)}</p>
              <div>Price : ${p.totalPrice ? p.totalPrice : p.price }
                <select
                  className={styles.Quantity}
                  value={p.quantity}
                  onChange={e => changeQuantity(p, Number(e.target.value))}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
             
              <button onClick={() => naviate(`/product/${p.slug}`)}>
                See More
              </button>
            </div>
          </div>
        )) : []}
      </div>

      <div className={styles.cartSummary}>
        <h2 className={styles.totalPrice}>Total : {totalPrice()}</h2>
        </div>
        {(cart.length) 
           ? 
          <div className={styles.order} onClick={handleCreate}>Make Order</div> 
           :
          <div className={styles.order} onClick={() => naviate('/')}>Go To Home</div> }
       
    </Layout>
  );
};

export default Cart;

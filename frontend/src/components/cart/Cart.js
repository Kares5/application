import Layout from './../Layout';
import { useCart } from '../../context/cart';
import { useNavigate } from 'react-router-dom';
import styles from './cart.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';



const Cart = () => {
    const naviate = useNavigate()
    const [cart , setCart] = useCart()


    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
          } catch (error) {
            console.log(error);
          }
    }

    const totalPrice = () => {
        try {
            let total = 0
            cart.map((item) => {
                total = total + (item.price )     
            })
            return total            
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = async () => {
      try {
        const {data} = await axios.post('http://localhost:5000/api/product/create-order' , {cart})
        localStorage.removeItem('cart')
        setCart([])
        toast.success("Create Order Completed Successfully")        
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <Layout>
        <h4 className={styles.cartLength}>
           {cart.length > 0 && `You have ${cart.length} items in your cart `}
        </h4>

        <div className={styles.cotainerCart}>
            {cart.map ((p) => (
                <div className={styles.Singleproduct}>
                <div className={styles.imageProduct}>
                    <img src={`http://localhost:5000/api/product/product-photo/${p._id}`}alt = {p.name}/>
                    
                    <div className={styles.cartIcon}>
                      <i onClick={() => removeCartItem(p._id)} className='bi bi-trash'></i>
                    </div>
  
                </div>
                <div className={styles.productBody}>
                  <h2> {p.name}</h2>
                  <p> {p.description.substring(0 , 30)}</p>
                  <div> ${p.price}  </div>
               
               

                  <button onClick={() => naviate(`/product/${p.slug}`)}>See More</button>
                </div>
              </div>
            ))}
        </div>
  
        <div className={styles.cartSummary}>
          Total : {totalPrice()}
        </div>
      {cart.length > 0 ? 
        <div className={styles.order} onClick={handleCreate}>Make Order</div> 
        :
         <div className={styles.home} onClick={() => naviate('/')}>Go To Home</div>
         }
        
    </Layout>
  )
}

export default Cart
// <input type='number' placeholder='Quantity'/>
// <span>total</span>
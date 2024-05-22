import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/user/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from './pages/Admin/AdminDashboard';
import Users from "./pages/Admin/Users";
import Categories from './pages/Admin/Categories';
import ProfileUser from "./pages/user/ProfileUser";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import Products from './pages/Admin/Products';
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Cart from "./components/cart/Cart";
import Favorite from "./components/favorite/Favorite";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CategoryProduct from './pages/Admin/categoryProduct/CategoryProduct';
import UserOrders from './pages/user/UserOrders';
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route  path="/cart" element={<Cart />}/>
        <Route path="/favorites" element={<Favorite />}/>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<ProfileUser />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<ProfileAdmin />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/categories" element={<Categories />}/>
          <Route path="admin/categories/:slug" element={<CategoryProduct />}/>
          <Route path="admin/products" element={<Products />}/>
          <Route path="admin/products/:slug" element={<UpdateProduct />}/>
          <Route path="admin/orders" element={<AdminOrders />}/>   
        </Route>

      </Routes>
    </div>
  );
}

export default App;

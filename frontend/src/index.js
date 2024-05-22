import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth';
import "antd/dist/reset.css";
import { CartProvider } from './context/cart';
import { FavoriteProvider } from './context/favorite';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider >
    <CartProvider> 
      <FavoriteProvider>   
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoriteProvider> 
    </CartProvider>
  </AuthProvider>

  
);



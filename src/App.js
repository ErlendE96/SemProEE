import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Pages/Layout/Layout.js';
import ContactPage from './Pages/ContactPage/ContactPage.js';
import ProductPage from './Pages/ProductPage/ProductPage.js';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage.js';
import CheckoutSuccessPage from './Pages/CheckoutSuccessPage/CheckoutSuccessPage.js';
import HomePage from './Pages/HomePage/HomePage.js';
import { CartProvider } from './Pages/CheckoutPage/CartContext/CartContext.js';
import RegisterPage from './Pages/RegisterPage/RegisterPage.js';
import { LoginListener, createApiKey } from './Pages/LoginPage/LoginPage.js'; 
import ProfilePage  from './Pages/ProfilePage/ProfilePage.js'; // Import named exports
import '../src/Pages/Styling/App.css';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginListener />} /> 
              <Route path="/profile" element={<ProfilePage />} /> 
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;

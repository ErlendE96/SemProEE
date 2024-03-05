import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext/CartContext';

const CheckoutPage = () => {
  const { cart, removeFromCart, emptyCart } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    const indexToRemove = cart.findIndex((item) => item.id === productId);

    if (indexToRemove !== -1) {
      const updatedCart = [...cart.slice(0, indexToRemove), ...cart.slice(indexToRemove + 1)];
      removeFromCart(updatedCart);
    }
  };

  const handleCheckout = () => {

    if (cart.length === 0) {
      alert('Error: The cart is empty. Add items before checking out.');
      return;
    }

    emptyCart();

    navigate('/checkout-success');
  };

  const totalCost = cart.reduce((acc, item) => acc + item.discountedPrice, 0).toFixed(2);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add items before checking out.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((cartItem, index) => (
              <li key={`${cartItem.id}-${index}`} className="cart-item">
                <div className="item-details">
                  <img src={cartItem.imageUrl} alt={cartItem.title} className="item-image" />
                  <div className="item-info">
                    <p className="item-title">{cartItem.title}</p>
                    <p className="item-price">${cartItem.discountedPrice}</p>
                  </div>
                </div>
                <button className="remove-button" onClick={() => handleRemoveFromCart(cartItem.id)}>
                  &#215;
                </button>
              </li>
            ))}
          </ul>
          <p className="total-cost">Total Cost: ${totalCost}</p>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}

      <Link to="/" className="back-to-home-link">
        Back to Home
      </Link>
    </div>
  );
};

export default CheckoutPage;

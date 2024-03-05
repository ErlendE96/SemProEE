// CartIcon.js
import React from 'react';
import shoppingCartImage from '../../../../Pages/Styling/img/icons8-shopping-cart-64.png';

const CartIcon = ({ itemCount }) => {
  return (
    <div className="cart-icon">
      <img className = "shoppingcartimg" src={shoppingCartImage} alt="Shopping Cart" />
      {itemCount > 0 && <div className="item-count">{itemCount}</div>}
    </div>
  );
}

export default CartIcon;

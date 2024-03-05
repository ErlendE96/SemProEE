import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CheckoutPage/CartContext/CartContext';
import * as authModule from '../LoginPage/LoginPage';
import signalIcon from '../Styling/img/signal.png';
import petsIcon from '../Styling/img/pawprint.png';
import parkingIcon from '../Styling/img/parking.png';
import breakfastIcon from '../Styling/img/breakfast.png';
import userIcon from '../Styling/img/user.png';
import starIcon from '../Styling/img/star.png';
import coinIcon from '../Styling/img/coin.png';
import { load } from '../js/storage/index.js';

const { auth } = authModule;

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${productId}`);

        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          const errorData = await response.json();
          setErrorMessage(`Failed to fetch product: ${errorData.message}`);
        }
      } catch (error) {
        setErrorMessage(`Error fetching product: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    setSuccessMessage(`Product added to the cart: ${product.name}`);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleBookVenue = async () => {
    try {
      const user = auth.getProfile();
      if (!user) {
        throw new Error("User not logged in.");
      }

      // Retrieve the API key from storage
      const apiKey = load("apiKey");

      if (!apiKey) {
        throw new Error("API key not found.");
      }

      // Replace these with the actual values from your user input or date picker
      const selectedStartDate = new Date(); 
      const selectedEndDate = new Date(); 

      // Show a loading spinner while waiting for the booking response
      setLoading(true);

      const response = await fetch('https://api.noroff.dev/api/v1/holidaze/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
          "X-Noroff-API-Key": apiKey.key,
        },
        body: JSON.stringify({
          dateFrom: selectedStartDate.toISOString(),
          dateTo: selectedEndDate.toISOString(),
          guests: 2, // Replace with the actual number of guests
          venueId: productId,
        }),
      });

      // Hide the loading spinner after the request is complete
      setLoading(false);

      if (response.ok) {
        const bookingData = await response.json();
        setSuccessMessage('Venue booked successfully!');
        
        // Redirect the user or perform other actions as needed
        navigate('/confirmation'); // Replace with the desired route

        // You can also use the booking data if needed
        console.log('Booking Data:', bookingData.data);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to book venue: ${errorData.message}`);
      }
    } catch (error) {
      // Hide the loading spinner in case of an error
      setLoading(false);
      setErrorMessage(`Error booking venue: ${error.message}`);
    }
  };
  const goToCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h2>eCom</h2>
      <ul className="product-list">
        <li key={product.id} className="product-card-view">
          <div className="product-info-view">
            <div className="product-image-view">
              <img src={product.media} alt={product.image} />
              <h2>{product.name}</h2>
            </div>
            <div className='metadata'>
              <div className={`icon ${product.meta.wifi ? 'enabled' : 'disabled'}`}>
                <img
                  src={signalIcon}
                  alt="WiFi Icon"
                  style={{ border: product.meta.wifi ? '2px solid transparent' : '2px solid red' }}
                />
              </div>
              <div className={`icon ${product.meta.pets ? 'enabled' : 'disabled'}`}>
                <img
                  src={petsIcon}
                  alt="Pets Icon"
                  style={{ border: product.meta.pets ? '2px solid transparent' : '2px solid red' }}
                />
              </div>
              <div className={`icon ${product.meta.parking ? 'enabled' : 'disabled'}`}>
                <img
                  src={parkingIcon}
                  alt="Parking Icon"
                  style={{ border: product.meta.parking ? '2px solid transparent' : '2px solid red' }}
                />
              </div>
              <div className={`icon ${product.meta.breakfast ? 'enabled' : 'disabled'}`}>
                <img
                  src={breakfastIcon}
                  alt="Breakfast Icon"
                  style={{ border: product.meta.breakfast ? '2px solid transparent' : '2px solid red' }}
                />
              </div>
            </div>
            <br></br>
            <div className='metadata'>
              <div className={`icon max-user`}>
                <img src={userIcon} alt="Breakfast Icon"/>
              </div>
              <div className={`icon max-user`}>
                {product.maxGuests}
              </div>
            </div>

            <div className='metadata'>
              <div className={`icon max-user`}>
                <img src={starIcon} alt="Breakfast Icon"/>
              </div>
              <div className={`icon max-user`}>
                {product.rating}
              </div>
            </div>
            
            <div className='metadata'>
              <div className={`icon max-user`}>
                <img src={coinIcon} alt="Coin Icon"/>
              </div>
              <div className={`icon max-user`}>
                {product.price}
              </div>
            </div>
        
            <div className='textalign'>
              <h3>{product.description}</h3>
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={goToCheckout}>Go to Checkout</button>
              <button onClick={handleBookVenue}>Book Venue</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProductPage;

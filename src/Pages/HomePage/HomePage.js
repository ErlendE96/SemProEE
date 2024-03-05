import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Layout/Header/SearchBar/SearchBar';
import signalIcon from '../Styling/img/signal.png';
import petsIcon from '../Styling/img/pawprint.png';
import parkingIcon from '../Styling/img/parking.png';
import breakfastIcon from '../Styling/img/breakfast.png';
import userIcon from '../Styling/img/user.png';
import starIcon from '../Styling/img/star.png';
import coinIcon from '../Styling/img/coin.png';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues');

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
<div>
    <h1>Holidaze</h1>
  <SearchBar onSearch={handleSearch} />
  <ul className="product-list">
    {filteredProducts.map(product => (
      <li key={product.id} className="product-card">
<div className="product-info">
<div className="product-image">
          <img src={product.media} alt={product.image} /></div>
          <h2>{product.name}</h2>
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
          <div className={`icon`}>
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
            </div>
          <div className="product-actions">
            <Link to={`products/${product.id}`}>
              <button>View Product</button>
            </Link>
          </div>

      </li>
    ))}
  </ul>
</div>

  );
};

export default HomePage;

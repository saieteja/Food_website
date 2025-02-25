import React from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantMenu.css';

const foodItemsByRestaurant = {
  Bawarchi: [
    { id: 1, name: 'Hyderabadi Biryani', image: 'biryani.jpg', price: 200 },
    { id: 2, name: 'Paneer Butter Masala', image: 'paneer.jpg', price: 180 },
    { id: 3, name: 'Chicken 65', image: 'chicken65.jpg', price: 250 },
  ],
  Paradise: [
    { id: 4, name: 'Chicken 65', image: 'chicken65.jpg', price: 250 },
    { id: 5, name: 'Mutton Curry', image: 'mutton.jpg', price: 300 },
    { id: 6, name: 'Tandoori Chicken', image: 'tandoori.jpg', price: 280 },
  ],
  Mandi: [
    { id: 7, name: 'Tandoori Chicken', image: 'tandoori.jpg', price: 280 },
    { id: 8, name: 'Fish Fry', image: 'fish.jpg', price: 220 },
  ],
  KFC: [
    { id: 9, name: 'Zinger Burger', image: 'zinger.jpg', price: 150 },
    { id: 10, name: 'Fried Chicken', image: 'Fried Chicken.jpeg', price: 180 },
  ],
  'Caption Cook': [
    { id: 11, name: 'Pasta Alfredo', image: 'pasta.jpg', price: 220 },
    { id: 12, name: 'Caesar Salad', image: 'salad.jpg', price: 150 },
  ],
  'Burger King': [
    { id: 13, name: 'Whopper', image: 'whopper.jpg', price: 200 },
    { id: 14, name: 'Cheesy Fries', image: 'fries.jpg', price: 100 },
  ],
};

function RestaurantMenu({ addToCart }) {
  const { restaurantName } = useParams();
  const foodItems = foodItemsByRestaurant[restaurantName] || [];

  return (
    <div className="restaurant-menu">
      <h2>{restaurantName} Menu</h2>
      <div className="food-items-list">
        {foodItems.length > 0 ? (
          foodItems.map(item => (
            <div key={item.id} className="food-item-card">
              <img src={`/assets/${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <button onClick={() => addToCart(item)}>➕ Add to Cart</button> {/* Add button */}
            </div>
          ))
        ) : (
          <p>No food items available for this restaurant.</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantMenu;

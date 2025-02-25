import React from 'react';
import './FoodItemList.css';

const foodItemsByRestaurant = {
  Bawarchi: [
    { id: 1, name: 'Hyderabadi Biryani', image: 'Restaurant-1.jpg' },
    { id: 2, name: 'Paneer Butter Masala', image: 'Restaurant 2.jpg' },
  ],
  Paradise: [
    { id: 3, name: 'Chicken 65', image: 'chicken65.jpg' },
    { id: 4, name: 'Mutton Curry', image: 'mutton.jpg' },
  ],
  Mehfil: [
    { id: 5, name: 'Tandoori Chicken', image: 'tandoori.jpg' },
    { id: 6, name: 'Fish Fry', image: 'fish.jpg' },
  ],
  Kritunga: [
    { id: 7, name: 'Andhra Meal', image: 'andhra.jpg' },
    { id: 8, name: 'Prawns Curry', image: 'prawns.jpg' },
  ],
  ShahGhouse: [
    { id: 9, name: 'Mutton Biryani', image: 'muttonbiryani.jpg' },
    { id: 10, name: 'Egg Curry', image: 'egg.jpg' },
  ],
};

function FoodItemList({ restaurant }) {
  const foodItems = foodItemsByRestaurant[restaurant] || [];

  return (
    <section className="food-items-section">
      <h2>{restaurant} Menu</h2>
      <div className="food-items">
        {foodItems.map((item) => (
          <div key={item.id} className="food-item-card">
            <img src={`/assets/${item.image}`} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FoodItemList;

import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for food or restaurant..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)} // Handle input change
      />
    </div>
  );
}

export default SearchBar;

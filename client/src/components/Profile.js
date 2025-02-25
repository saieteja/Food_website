// Profile.js
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user); // Access user from Redux store

    return (
        <div className="profile">
            <h2>Profile</h2>
            {user.isLoggedIn && user.user ? (
                <p>Email: {user.user.email}</p> // Display user's email
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;

// src/components/FoodPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const foodMenu = [
  { id: 1, name: "Popcorn", price: 120 },
  { id: 2, name: "Coke", price: 80 },
  { id: 3, name: "Nachos", price: 150 },
  { id: 4, name: "Burger", price: 200 },
];

function FoodPage() {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const { movie, showTime, seats } = location.state || {};

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleCheckout = async () => {
  const bookingData = {
    movieTitle: movie.title,
    showTime,
    seats,
    foodItems: selectedItems
  };

  // 🔍 Log data before sending it
  console.log("Sending booking data:", bookingData);

  try {
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Server responded with error:", errorDetails);
      throw new Error(errorDetails.message || "Booking failed");
    }

    const data = await response.json();
    console.log("Booking success:", data);

    alert("Thanks! Your food is added. Proceeding to confirmation.");

    navigate("/summary", {
      state: {
        movie,
        showTime,
        seats,
        foodItems: selectedItems
      }
    });

  } catch (error) {
    console.error("Booking error:", error);
    alert("Booking failed. Please try again.");
  }
};

  
  
  
    
  return (
    <div className="container py-5">
      {/* Movie Info Section */}
      {movie && (
        <div className="mb-4 text-center">
          <h5>🎬 <strong>Movie:</strong> {movie.title}</h5>
          <h6>🕒 <strong>Showtime:</strong> {showTime}</h6>
          <h6>🎟️ <strong>Seats:</strong> {seats?.join(', ')}</h6>
        </div>
      )}

      {/* Snack Selection Section */}
      <h2 className="text-center mb-4">Choose Your Snacks (Optional)</h2>
      <div className="row">
        {foodMenu.map(item => (
          <div key={item.id} className="col-md-3">
            <div className={`card mb-3 ${selectedItems.includes(item) ? "border-success" : ""}`}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">₹{item.price}</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => toggleItem(item)}
                >
                  {selectedItems.includes(item) ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={handleCheckout}
        >
          Proceed to Confirm
        </button>
      </div>
    </div>
  );
}

export default FoodPage;

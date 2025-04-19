// src/components/SummaryPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SummaryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { movie, showTime, seats, foodItems } = state || {};

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🎉 Booking Confirmation</h2>

      <div className="card shadow p-4">
        <h4>🎬 Movie: {movie?.title}</h4>
        <p><strong>⏰ Show Time:</strong> {showTime}</p>
        <p><strong>💺 Seats:</strong> {seats?.join(', ')}</p>
        <p><strong>🍿 Food Items:</strong> {foodItems?.map(f => f.name).join(', ') || "None"}</p>

        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;

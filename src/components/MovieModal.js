// src/components/MovieModal.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieModal({ movie, onClose }) {
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const totalSeats = 20;
  const seatNumbers = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    navigate('/food', {
      state: {
        movie,
        showTime: selectedShowTime,
        seats: selectedSeats
      }
    });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedShowTime
                ? `Booking for ${movie.title} - ${selectedShowTime}`
                : movie.title}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {!selectedShowTime ? (
              <>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="img-fluid mb-3"
                />
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Genre:</strong> {movie.info}</p>
                <h6>Show Timings:</h6>
                <div className="d-flex flex-wrap">
                  {movie.showTimings.map((time, index) => (
                    <button
                      key={index}
                      className="btn btn-primary m-1"
                      onClick={() => setSelectedShowTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p>Select your seats:</p>
                <div className="d-flex flex-wrap">
                  {seatNumbers.map((seat) => (
                    <button
                      key={seat}
                      className={`m-1 btn ${
                        selectedSeats.includes(seat)
                          ? 'btn-success'
                          : 'btn-secondary'
                      }`}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            {selectedShowTime ? (
              <>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setSelectedShowTime(null);
                    setSelectedSeats([]);
                  }}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleBooking}
                  disabled={selectedSeats.length === 0}
                >
                  Confirm Booking
                </button>
              </>
            ) : null}
            <button className="btn btn-danger" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;

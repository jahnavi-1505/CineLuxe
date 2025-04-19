const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: Number, required: true }],
  foodItems: [
    {
      name: String,
      price: Number,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings - create new booking
router.post('/', async (req, res) => {
  try {
    const { movieTitle, showTime, seats, foodItems } = req.body;

    const newBooking = new Booking({ movieTitle, showTime, seats, foodItems });
    await newBooking.save();
    
    res.status(201).json({ message: "Booking confirmed!", booking: newBooking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// GET /api/bookings - fetch all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Fetching error:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

module.exports = router;
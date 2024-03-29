const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  id: { type: Number },
  performer: { type: String, required: true },
  genre: { type: String },
  price: { type: Number, required: true },
  day: { type: Number, required: true },
  image: { type: String, required: true },
  freeTickets: {type: Number},
});

module.exports = mongoose.model('Concert', concertSchema);
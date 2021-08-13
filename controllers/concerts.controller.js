const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find().lean();

    const concertsAltered = concerts.map(async concert => {
      const seatsTaken = await Seat.find({ day: concert.day }).lean();
      const concertAltered = {
        ...concert,
        freeTickets: 50 - seatsTaken.length
      }
      return concertAltered
    })
    res.json(await Promise.all(concertsAltered));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}


exports.getById = async (req, res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(!con) res.status(404).json({ message: 'Not found' });
      else res.json(con);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }  
}

exports.postCon = async (req, res) => {
    try {
      const { id, performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.putCon = async (req, res) => {
    const { id, performer, genre, price, day, image } = req.body;
  
    try {
      const con = await Concert.findById(req.params.id);
      if(con) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.deleteCon = async (req, res) => {
    try {
      const con = await Concert.findById(req.params.id);
      if(con) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}
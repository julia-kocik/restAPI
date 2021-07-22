const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all seats
router.route('/seats').get((req, res) => {
    res.json(db.seats)
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find(elem => elem.id == req.params.id))
});

router.route('/seats').post((req, res) => {
    const isTaken = db.seats.some(elem => elem.day == req.body.day && elem.seat == req.body.seat);
    if(isTaken) {
        res.json({ message: "The slot is already taken..." })
    } else {    
        db.seats.push({id: uuidv4(), day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email })
        res.json({message: "OK"})
    }
});

router.route('/seats/:id').put((req, res) => {
    const id = db.seats.find(elem => elem.id == req.params.id);
    if(!id) {
        res.json({message: 'NOT OK'})
    } else {
        id.day = req.body.day;
        id.seat = req.body.seat;
        id.client = req.body.client;
        id.email = req.body.email;
        res.json({message: 'OK'})
    }
});

router.route('/seats/:id').delete((req, res) => {
    const index = db.concerts.findIndex(elem => elem.id === req.params.id);
    db.seats.splice(index, 1);
    res.json({message: "OK"})
});


module.exports = router;
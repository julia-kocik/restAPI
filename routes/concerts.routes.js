const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials
router.route('/concerts').get((req, res) => {
    res.json(db.concerts)
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find(elem => elem.id == req.params.id))
});

router.route('/concerts').post((req, res) => {
    db.concerts.push({id: uuidv4(), performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image})
    res.json({message: "OK"});
});

router.route('/concerts/:id').put((req, res) => {
    const id = db.concerts.find(elem => elem.id == req.params.id);
    if(!id) {
        res.json({message: 'NOT OK'})
    } else {
        id.performer = req.body.performer;
        id.genre = req.body.genre;
        id.price = req.body.price;
        id.day = req.body.day
        id.image = req.body.image;
        res.json({message: 'OK'})
    }
});

router.route('/concerts/:id').delete((req, res) => {
    const index = db.concerts.findIndex(elem => elem.id === req.params.id);
    db.concerts.splice(index, 1);
    res.json({message: "OK"})
});


module.exports = router;
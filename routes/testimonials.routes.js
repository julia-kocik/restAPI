const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.find(elem => elem.id == req.params.id))
});

router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[`${Math.floor(Math.random() * db.testimonials.length)}`])
});

router.route('/testimonials').post((req, res) => {
    db.testimonials.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json({message: "OK"});
});

router.route('/testimonials/:id').put((req, res) => {
    const id = db.testimonials.find(elem => elem.id === req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json({message: "OK"});
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const index = db.testimonials.findIndex((item) => item.id == req.params.id);
    db.testimonials.splice(index, 1);
    res.json({ message: "OK" });
});


module.exports = router;
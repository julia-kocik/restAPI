const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require("./db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//testimonials
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials)
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.find(elem => elem.id === req.params.id))
});

app.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[`${Math.floor(Math.random() * db.testimonials.length)}`])
});

app.post('/testimonials', (req, res) => {
    db.testimonials.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json({message: "OK"});
});

app.put('/testimonials/:id', (req, res) => {
    const id = db.testimonials.find(elem => elem.id === req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json({message: "OK"});
    }
});

app.delete("/testimonials/:id", (req, res) => {
    const index = db.testimonials.findIndex((item) => item.id == req.params.id);
    db.testimonials.splice(index, 1);
    res.json({ message: "OK" });
});

//concerts
app.get('/concerts', (req, res) => {
    res.json(db.concerts)
});

app.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.find(elem => elem.id === req.params.id))
});

app.post('/concerts', (req, res) => {
    db.concerts.push({id: uuidv4(), performer: req.body.performer, genre: req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image})
    res.json({message: "OK"});
});

app.put('/concerts', (req, res) => {
    const id = db.concerts.find(elem => elem.id === req.params.id);
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

app.delete('/concerts/:id', (req, res) => {
    const index = db.concerts.findIndex(elem => elem.id === req.params.id);
    db.concerts.splice(index, 1);
    res.json({message: "OK"})
});

//seats

app.get('/seats', (req, res) => {
    res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
    res.json(db.seats.find(elem => elem.id === req.params.id));
});

app.post('/seats/', (req, res) => {
    db.seats.push({id: uuidv4(), day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email })
    res.json({message: "OK"})
});

app.put('/seats', (req, res) => {
    const id = db.seats.find(elem => elem.id === req.params.id);
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

app.delete('/seats/:id', (req, res) => {
    const index = db.concerts.findIndex(elem => elem.id === req.params.id);
    db.seats.splice(index, 1);
    res.json({message: "OK"})
});


app.use((req, res) => {
    res.status(404).send({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
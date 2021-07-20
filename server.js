const express = require('express');

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.json(db)
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find(elem => elem.id === req.params.id))
});

app.get('/testimonials/random', (req, res) => {
    res.json(db[`${Math.floor(Math.random() * db.length)}`])
});

app.delete('/testimonials/:id', (req, res) => {
    res.json(db[id])
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
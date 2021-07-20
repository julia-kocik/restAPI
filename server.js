const express = require('express');
const { v4: uuidv4 } = require('uuid');

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/testimonials', (req, res) => {
    res.json(db)
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find(elem => elem.id === req.params.id))
});

app.get('/testimonials/random', (req, res) => {
    res.json(db[`${Math.floor(Math.random() * db.length)}`])
});

app.post('/testimonials', (req, res) => {
    db.push({id: uuidv4(), author: req.body.author, text: req.body.text})
    res.json({message: "OK"});
});

app.put('/testimonials/:id', (req, res) => {
    const id = db.find(elem => elem.id === req.params.id);
    if(!id) {
        res.json({message: "NOT OK"});
    } else {
        id.author = req.body.author
        id.text = req.body.text
        res.json({message: "OK"});
    }
});

app.delete("/testimonials/:id", (req, res) => {
    const index = db.findIndex((item) => item.id == req.params.id);
    db.splice(index, 1);
    res.json({ message: "OK" });
  });

app.use((req, res) => {
    res.status(404).send({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
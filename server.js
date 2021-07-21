const express = require('express');
const db = require("./db");
const cors = require("cors");

const app = express();

// import routes
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes); 

app.get('/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
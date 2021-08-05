const express = require("express");
const path = require("path");
const cors = require("cors");
const socket = require('socket.io');


const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

app.get("", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket');
});


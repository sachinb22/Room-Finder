// const express = require('express')
// const app = express()
// const mongoose =  require('mongoose')
// const dotenv = require('dotenv').config()
// const cors = require('cors')
// const router = express.Router();

// const authRoutes = require('./routes/auth')

// app.use(cors())
// app.use(express.json())
// app.use(express.static('public'))

// // Routes
// app.use('/auth', authRoutes)

// mongoose.connect('mongodb://127.0.0.1:27017/roomRental')

// app.listen(3001, () => {
//     console.log('Server is Running')
// })

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
// const listingRoutes = require("./routes/listing.js")
// const bookingRoutes = require("./routes/booking.js")
// const userRoutes = require("./routes/user.js")

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)
// app.use("/properties", listingRoutes)
// app.use("/bookings", bookingRoutes)
// app.use("/users", userRoutes)

/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect('mongodb://127.0.0.1:27017/roomRental', {
    dbName: "roomRental",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT} is running!`));
  })
  .catch((err) => console.log(`${err} did not connect`));
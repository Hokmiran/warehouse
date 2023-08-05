const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
// const productRoute = require("./routes/productRoute");
// const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/users", userRoute);
// app.use("/api/products", productRoute);
// app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.CONNECTION)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));






























// const express = require('express');
// const { db } = require('./config/db');
// const cors = require("cors");
// const userRoutes = require('./routes/userRoute');

// require('dotenv').config();

// db.connect();

// const app = express();

// app.use(express.json());

// app.use('/users', userRoutes)

// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:3000'
// }));

// app.listen(process.env.API_PORT, () => {
//     console.log('server is running');
// });
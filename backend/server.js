const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const employeeRoute = require("./routes/employeeRoute");
const positionRoute = require("./routes/positionRoute");
const productTransactionRoute = require("./routes/productTransactionRoute");
const productCategoryRoute = require("./routes/productCategoryRoute");
const productRoute = require("./routes/productRoute");
const departmentRoute = require("./routes/departmentRoute");
const purchaseRequestRoute = require("./routes/purchaseRequestRoute");
// const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/users", userRoute);
app.use("/employee", employeeRoute);
app.use("/positions", positionRoute);
app.use("/products", productCategoryRoute);
app.use("/products", productTransactionRoute);
app.use("/products", productRoute);
app.use('/departments', departmentRoute);
app.use('/purchase-requests', purchaseRequestRoute);
// app.use("/contact-us", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.API_PORT;
mongoose
  .connect(process.env.CONNECTION)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

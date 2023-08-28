const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

//config
dotenv.config({ path: "backend/config/config.env" });

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// route imports
const product = require("./routes/productRoute");
app.use("/api/v1", product);

const order = require("./routes/orderRoute");
app.use("/api/v1", order);

const user = require("./routes/userRoute");
app.use("/api/v1", user)

const payment = require("./routes/paymentRoute")
app.use("/api/v1", payment)

// Middleware for error
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;

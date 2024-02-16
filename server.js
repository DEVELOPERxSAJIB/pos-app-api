require("dotenv").config();
require("colors");
const express = require("express");
const errorHandler = require("http-errors");
const cors = require("cors");
const mongoDBConnection = require("./config/configDB");
const productRouter = require("./routers/productRouter");
const userRoute = require("./routers/userRouter");
const { errorResponse } = require("./controller/responseController");
const billRoute = require("./routers/billRouter");

// init app
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pos-app-client-zarj.onrender.com",
    ],
    credentials: true,
  })
);

// routers
app.use("/product", productRouter);
app.use("/user", userRoute);
app.use("/bills", billRoute);

// error handling middlewares
app.use((req, res, next) => {
  next(errorHandler(404, "routers not found"));
});

// server error handler
app.use((err, req, res, next) => {
  errorResponse(res, { statusCode: err.status, message: err.message });
});

// environment variable
const PORT = process.env.PORT || 8000;

// create server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgYellow);
  mongoDBConnection();
});

const express = require("express");
const { createBill, allBills } = require("../controller/billController");

// init router
const billRoute = express.Router();

// routes
billRoute.post("/create-bill", createBill);
billRoute.get('/all-bills', allBills)


// module exports
module.exports = billRoute
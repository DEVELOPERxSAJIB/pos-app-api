const Bill = require("../model/Bill");
const { errorResponse, successResponse } = require("./responseController");

const createBill = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      paymentMethod,
      subTotal,
      grandTotal,
      tax,
      cartItems,
    } = req.body;

    const data = {
      customerName,
      phone,
      paymentMethod,
      subTotal,
      grandTotal,
      tax,
      cartItems,
    };

    if (!customerName || !phone || !paymentMethod) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All feilds are required",
      });
    }

    const bill = await Bill.create(data);

    if (!bill) {
      return errorResponse(res, {
        statusCode: 400,
        message: "can't create bill",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Bill created successfully",
      payload: bill,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const allBills = async (req, res) => {
  try {
    const bill = await Bill.find();

    successResponse(res, {
      statusCode: 200,
      message: "All bills getting",
      payload: bill,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createBill, allBills };

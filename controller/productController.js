const Proudct = require("../model/Proudct");
const { successResponse, errorResponse } = require("./responseController");

const getAllProduct = async (req, res) => {
  const product = await Proudct.find();

  res.status(200).json({ message: "All products", product });
};

const createProduct = async (req, res) => {
  try {
    const { name, image, category, price } = req.body;

    if (!name || !image || !category || !price) {
      errorResponse(res, {
        statusCode: 400,
        message: "All feilds are required",
      });
    }

    const product = await Proudct.create({ name, image, category, price });

    if (product) {
      res.status(200).json({ message: "New product created", product });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Proudct.findByIdAndDelete(id);

    res.status(200).json({ message: "Product successfully deleted", product });
  } catch (error) {
    console.log(error.message);
  }
};

// edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, image } = req.body;

    const product = await Proudct.findByIdAndUpdate(id, {
      name,
      price,
      category,
      image,
    });

    res.status(200).json({ message: "Product edited successfull", product });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  deleteProduct,
  editProduct,
};

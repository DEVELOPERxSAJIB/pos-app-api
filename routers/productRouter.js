const express = require("express");
const { getAllProduct, createProduct, deleteProduct, editProduct } = require("../controller/productController");

// init router
const productRouter = express.Router();

// routers
productRouter.get("/get-all-product", getAllProduct);
productRouter.post("/create-product", createProduct);
productRouter.delete("/delete-product/:id", deleteProduct)
productRouter.patch("/edit-product/:id", editProduct)

// export
module.exports = productRouter;

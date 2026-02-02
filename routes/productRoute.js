import express from "express";
import {
  listProduct,
  singleProduct,
  addProduct,
  removingProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();
//Create A New Product
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
//Delete an existing Product by id
productRouter.delete("/remove/:id", adminAuth, removingProduct);
//Retrieve a product by id
productRouter.post("/single", singleProduct);
// retrieve all products
productRouter.get("/list", listProduct);

export default productRouter;

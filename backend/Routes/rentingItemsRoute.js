import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../Controllers/rentingItemsController.js";

const router = express.Router();

// get all products
router.get("/", getProducts);
// create a product
router.post("/", createProduct);
// update a product
router.put("/:id", updateProduct);
// delete a product
router.delete("/:id", deleteProduct);

export default router;

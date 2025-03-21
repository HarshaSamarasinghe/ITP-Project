import express from "express";
import {createRentingOrder, getOrders, updateReturnRequest} from "../Controllers/rentingOrderController.js";

const router = express.Router();

// save a renting order Details
router.post("/", createRentingOrder);
// get all renting order details
router.get("/", getOrders);

// update a Order Status
router.put("/:id", updateReturnRequest);


export default router;
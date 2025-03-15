import express from "express";
import {createRentingOrder, getOrders} from "../Controllers/rentingOrderController.js";

const router = express.Router();

// save a renting order Details
router.post("/", createRentingOrder);
// get all renting order details
router.get("/", getOrders);


export default router;
import express from "express";
import {createRentingOrder} from "../Controllers/rentingOrderController.js";

const router = express.Router();

// save a renting order Details
router.post("/", createRentingOrder);


export default router;
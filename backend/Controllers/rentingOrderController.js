import mongoose from "mongoose";
import rentCusOrderDetails from "../Model/rentingOrderDetailsModel.js";

export const createRentingOrder = async (req, res) => {
	const order = req.body; // user will send this data

	
	if (!order.cusName || !order.cusEmail || !order.cusPhone || !order.cusAddress || !order.cusTown || !order.cusPostalCode || !order.shippingMethod || !order.rentFrom || !order.rentTo) {
		
		return res.status(400).json({ success: false, message: " Please provide all fields" });
		
	}

	const newRentingOrder = new rentCusOrderDetails(order);

	try {
		await newRentingOrder.save();
		res.status(201).json({ success: true, data: newRentingOrder });
	} catch (error) {
		console.error("Error in Place Renting Order:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getOrders = async (req, res) => {
	try {
		const orders = await rentCusOrderDetails.find({}).populate("eqID");
		res.status(200).json({ success: true, data: orders });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

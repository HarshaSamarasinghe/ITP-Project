import mongoose from "mongoose";

const RentingOrderDetailsModel = new mongoose.Schema(
	{
		cusName: {
			type: String,
			required: true,
		},
		eqID: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "RentingItems"
		},
		cusEmail: {
			type: String,
			required: true,
		},
		cusPhone: {
			type: Number,
			required: true,
		},
		cusAddress: {
			type: String,
			required: true,
		},
		cusTown: {
			type: String,
			required: true,
		},
        cusPostalCode: {
			type: Number,
			required: true,
		},
        TotalPrice: {
			type: Number,
			default: 0,
		},
		
		shippingMethod: {
			type: String,
			required: true,
		},
		rentFrom: {
			type: Date,
			required: true,
		},
		rentTo: {
			type: Date,
			required: true,
		},
		
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const rentCusOrderDetails = mongoose.model("RentingOrderDetails", RentingOrderDetailsModel);

export default rentCusOrderDetails;

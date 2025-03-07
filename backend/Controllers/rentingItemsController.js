import rentingItemsModel from "../Model/rentingItemsModel.js";

// Create a new renting item
const createRentingItem = async (req, res) => {
        const { eqName, eqDescription,eqPrice, eqImage, eqAvailability, eqDuration } = req.body;
        const rentingItems = new rentingItemsModel({
            eqName, 
            eqDescription,
            eqPrice, 
            eqImage, 
            eqAvailability,
            eqDuration
           
        });
        try {
            await rentingItems.save();
            res.status(201).json({success:true ,message: "Renting item created successfully"});
        } catch (error) {
            console.log(error)
            res.status(409).json({success: false, message: "Error in creating renting item"});
        }
}
// Update a renting item
const updateRentingItem = async (req, res) => {
    
}
// Delete a renting item
const deleteRentingItem = async (req, res) => {

}
// Get a renting item
const getRentingItem = async (req, res) => {

}
// List all renting items
const listAllRentingItems = async (req, res) => {
    
}

export { createRentingItem, updateRentingItem, deleteRentingItem, getRentingItem, listAllRentingItems };
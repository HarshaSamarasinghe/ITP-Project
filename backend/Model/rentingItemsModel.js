import mongoose, { Schema } from 'mongoose';

const RentingItemsSchema = new Schema({

    eqName: {
        type: String,
        required: true,
    },
    eqDescription: {
        type: String,
        required: true,
    },
    eqPrice: {
        type: Number,
        required: true,
    },
    eqImage: {
        type: String,
        required: true,
    },
    eqAvailability: {
        type: String,
        required: true,
    },
    eqDuration: {
        type: String,
        required: true,
    },
},
{
    timestamps: true, // createdAt, updatedAt
}
);

const rentingItemsModel = mongoose.model.renting || mongoose.model('renting', RentingItemsSchema);
export default rentingItemsModel;

import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("DB Connected Successfully!");
    }
    catch(error){
        console.log("Mongo DB connection Error!!");
    }
}
export default connectDB;
import mongoose from "mongoose";
const connectdb = async () => {
    await mongoose.connect("");
    console.log("Database connected successfully");

};

export default connectdb;

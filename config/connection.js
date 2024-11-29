import mongoose from "mongoose";
const connectdb = async () => {
    await mongoose.connect("mongodb+srv://adilibadov:salamAleykum@university.6okyz.mongodb.net/?retryWrites=true&w=majority&appName=university");
    console.log("Database connected successfully");

};

export default connectdb;
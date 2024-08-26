import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI);
        if (response) {
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
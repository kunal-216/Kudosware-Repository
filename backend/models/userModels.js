import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resume: { type: String, required: true },
    bio: { type: String, required: true },
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema);
export default userModel;
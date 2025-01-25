import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    cnic: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    country: { type: String }
});

const User = mongoose.model("User", userSchema);
export default User;
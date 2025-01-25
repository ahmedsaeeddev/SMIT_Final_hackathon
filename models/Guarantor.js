import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema({
    cnic: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    country: { type: String },
    relationshipToBorrower: { type: String, required: true },
    loanAmountGuaranteed: { type: Number, required: true }
});

const Guarantor = mongoose.model("Guarantor", guarantorSchema);

export default Guarantor;

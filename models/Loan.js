import mongoose from "mongoose";

// Define the Loan schema
const loanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: String, required: true }, // Duration in months or years
    status: { type: String, default: "Pending" }, // Example status of loan request
    guarantorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the guarantor (User)
    guarantorDetails: {
        name: { type: String },
        cnic: { type: String },
        email: { type: String },
        relationshipToBorrower: { type: String },
        loanAmountGuaranteed: { type: Number }
    }
});

// Register the Loan model
const Loan = mongoose.model("Loan", loanSchema);

export default Loan;

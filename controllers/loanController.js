import Loan from "../models/Loan.js";
import User from "../models/User.js";
export const submitLoanRequest = async (req, res) => {
    try {
        const { userId, category, subcategory, amount, duration, guarantorId } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate required fields
        if (!category || !subcategory || !amount || !duration) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let guarantorDetails;

        // If a guarantorId is provided, check for guarantor details
        if (guarantorId) {
            const guarantor = await User.findById(guarantorId);
            if (!guarantor) {
                return res.status(404).json({ message: "Guarantor not found." });
            }

            // If the user exists and is set as a guarantor, include the guarantor details
            guarantorDetails = {
                name: guarantor.name,
                cnic: guarantor.cnic,
                email: guarantor.email,
                relationshipToBorrower: guarantor.relationshipToBorrower,
                loanAmountGuaranteed: guarantor.loanAmountGuaranteed
            };
        }

        // Create a new loan with the guarantor details (if provided)
        const newLoan = new Loan({
            userId,
            category,
            subcategory,
            amount,
            duration,
            guarantorId: guarantorId || null, // Optional reference to the guarantor
            guarantorDetails
        });

        await newLoan.save();

        res.status(201).json({
            message: "Loan request submitted successfully.",
            loan: newLoan,
        });
    } catch (error) {
        console.error("Error submitting loan request:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};


// export const getLoanDetails = async (req, res) => {
//     try {
//         const { id } = req.params;  // Extract loan ID from request parameters

//         // Fetch loan document by ID, populate both userId and guarantor
//         const loan = await Loan.findById(id)
//             .populate("userId", "name email") // Populate userId
//             .populate("guarantor"); // Populate guarantor
//         // Populate guarantor with full guarantor details

//         if (!loan) {
//             return res.status(404).json({ message: "Loan not found." });
//         }

//         // Calculate the monthly payment (without interest)
//         const monthlyPayment = loan.amount / (loan.duration * 12);  // amount / months

//         // Generate the breakdown of loan payments for each month
//         const loanBreakdown = [];
//         const startDate = new Date(loan.createdAt);

//         for (let i = 0; i < loan.duration * 12; i++) {
//             const month = new Date(startDate);
//             month.setMonth(startDate.getMonth() + i);
//             loanBreakdown.push({
//                 month: month.toISOString().split('T')[0], // format YYYY-MM-DD
//                 payment: monthlyPayment.toFixed(2), // Format to two decimal places
//             });
//         }

//         // Destructure the loan object
//         const {
//             userId,        // populated User object
//             category,
//             subcategory,
//             amount,
//             duration,
//             status,
//             createdAt,
//             guarantor      // populated Guarantor object
//         } = loan;

//         // Return the loan details with the breakdown, including the guarantor information as a sub-object
//         res.status(200).json({
//             loan: {
//                 userId,        // userId now holds populated user info
//                 category,
//                 subcategory,
//                 amount,
//                 duration,
//                 status,
//                 createdAt,
//                 guarantor,     // guarantor object is included
//                 loanBreakdown,  // Loan payment breakdown
//             },
//         });
//     } catch (error) {
//         console.error("Error fetching loan breakdown:", error.message);
//         res.status(500).json({ message: "Server error.", error: error.message });
//     }
// };


// Controller to get loan details with merged guarantor data
export const getLoanDetails = async (req, res) => {
    const { id } = req.params;

    try {
        // Step 1: Find the loan by ID
        const loan = await Loan.findById(id).lean();  // Using lean() for performance improvement

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        console.log("Found Loan:", loan);  // Log the loan for debugging purposes

        // Check if the loan has a valid guarantorId
        // if (!loan.guarantorId) {
        //     return res.status(400).json({ message: "Loan does not have a guarantor ID" });
        // }

        // Step 2: Find the guarantor by their ID
        const guarantor = await Guarantor.findById(loan.guarantorId);  // Using lean() for performance improvement

        if (guarantor) {
            return res.status(404).json({ message: "Guarantor found" });
        }

        console.log("Found Guarantor:", guarantor);  // Log the guarantor for debugging purposes

        // Step 3: Merge the guarantor data into the loan object
        const loanWithGuarantor = {
            ...loan,  // Spread loan data
            guarantor,  // Add the guarantor data as a sub-object
        };

        // Return the loan with the merged guarantor data
        res.status(200).json(loanWithGuarantor);
    } catch (err) {
        console.error("Error in getLoanDetails:", err);
        res.status(500).json({ message: "Server error.", error: err.message });
    }
};




export const updateLoanStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (status !== "approved" && status !== "rejected") {
            return res.status(400).json({ message: "Invalid status. It must be 'approved' or 'rejected'." });
        }

        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found." });
        }

        if (loan.status == "pending") {
            return res.status(400).json({ message: "Loan status cannot be changed. It is already processed." });
        }

        loan.status = status;
        await loan.save();

        res.status(200).json({ message: `Loan status updated to ${status}.`, loan });
    } catch (error) {
        console.error("Error updating loan status:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

// import Guarantor from "../models/Guarantor.js";  // Import the Guarantor model

// export const getLoanDetailsWithGuarantor = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Fetch the loan document by ID and populate the user and guarantor information
//         const loan = await Loan.findById(id)
//             .populate("userId", "name email")  // Populate user info
//             .populate("guarantor", "name email relationshipToBorrower loanAmountGuaranteed"); // Populate guarantor info

//         if (!loan) {
//             return res.status(404).json({ message: "Loan not found." });
//         }

//         res.status(200).json({ loan });
//     } catch (error) {
//         console.error("Error fetching loan details with guarantor:", error.message);
//         res.status(500).json({ message: "Server error.", error: error.message });
//     }
// };

export const addGuarantor = async (req, res) => {
    const { cnic, email, name, password, country, relationshipToBorrower, loanAmountGuaranteed } = req.body;

    try {
        // Create a new guarantor object
        const newGuarantor = new Guarantor({
            cnic,
            email,
            name,
            password,
            country,
            relationshipToBorrower,
            loanAmountGuaranteed,
        });

        // Save the guarantor to the database
        await newGuarantor.save();

        // Respond with success
        res.status(201).json({ message: "Guarantor added successfully", guarantor: newGuarantor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding guarantor", error: err.message });
    }
};

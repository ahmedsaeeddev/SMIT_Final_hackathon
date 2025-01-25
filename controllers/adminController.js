import Loan from "../models/Loan.js";

/**
 * View All Applications
 * @route GET /api/admin/applications
 * @access Admin
 */
export const viewApplications = async (req, res) => {
    try {
        // Fetch all loan applications
        const applications = await Loan.find().populate("userId", "name email");
        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

/**
 * Update Loan Application Status
 * @route PUT /api/admin/update/:id
 * @access Admin
 */
export const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        // Find and update the loan application status
        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan application not found." });
        }

        res.status(200).json({
            message: "Loan application status updated successfully.",
            loan: updatedLoan,
        });
    } catch (error) {
        console.error("Error updating application status:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

/**
 * Filter Applications by City/Country
 * @route GET /api/admin/filter-applications
 * @access Admin
 */
export const filterApplications = async (req, res) => {
    try {
        const { city, country } = req.query;

        // Build the query dynamically based on filters
        const query = {};
        if (city) query["userId.city"] = city;
        if (country) query["userId.country"] = country;

        // Fetch filtered applications
        const applications = await Loan.find(query).populate("userId", "name email city country");

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error filtering applications:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

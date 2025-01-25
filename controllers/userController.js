import User from "../models/User.js";
import bcrypt from "bcrypt";    
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { cnic, email, name, password } = req.body;

        // Hash kraha ha password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user hoga
        const newUser = new User({ cnic, email, name, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 67952ffbaabfbee7d726e546

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        // Generate token hoga
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

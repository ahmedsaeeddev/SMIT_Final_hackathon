import express from 'express';
import User from '../models/User.js';  // Importing User model
import { checkAdmin } from '../utils/utils.js';  // Middleware to check if user is admin
const userRoute = express.Router();

// GET API to fetch the list of all users
userRoute.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Send the list of users as response
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
});

// DELETE API to delete a user by admin
userRoute.delete('/user/:id', checkAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

export default userRoute;

import express from "express";
import { viewApplications, updateApplication } from "../controllers/adminController.js";

const  adminRoutes = express.Router();

adminRoutes.get("/applications", viewApplications);
adminRoutes.put("/update/:id", updateApplication);

export default adminRoutes;

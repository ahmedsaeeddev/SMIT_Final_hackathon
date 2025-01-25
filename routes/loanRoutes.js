import express from "express";
import { submitLoanRequest, getLoanDetails, updateLoanStatus } from "../controllers/loanController.js";

const loanRoutes = express.Router();

loanRoutes.post("/submit", submitLoanRequest);
loanRoutes.get("/:id", getLoanDetails);
loanRoutes.put("/:id/status", updateLoanStatus);
// loanRoutes.get("/guarantor/:id", getLoanDetailsWithGuarantor);

export default loanRoutes;

import express from "express";
import { createResultController, deleteResultcontroller, getAllResult, getSingleResult, updateResult } from "../controller/resultController.js";
const router = express.Router();

// Create result
router.post("/create-result",createResultController);
// Get all result
router.get("/get-all-result",getAllResult);
// get single result
router.get("/get-single-result/:id",getSingleResult);
// update result
router.put("/update-result/:id",updateResult)
//delete result
router.delete("/delete-result/:id",deleteResultcontroller)
export default router;
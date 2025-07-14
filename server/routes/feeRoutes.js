import express from "express";
import {
  createFeeController,
  deleteFeeController,
  getAllFeeController,
  getSingleFeeController,
  updateFeeController,
} from "../controller/feeController.js";
const router = express.Router();

// create fee
router.post("/create-fee", createFeeController);
// get all fees
router.get("/get-all-fee", getAllFeeController);
// get single fee
router.get("/single-fee/:id", getSingleFeeController);
// update fee
router.put("/update-fee/:id", updateFeeController);
// delete fee
router.delete("/delete-fee/:id", deleteFeeController);
export default router;

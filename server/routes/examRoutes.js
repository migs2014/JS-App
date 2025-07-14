import express from "express";
import {
  createExamController,
  deleteExamController,
  getAllExamController,
  getSingleExamController,
  updateExamController,
} from "../controller/examController.js";
const router = express.Router();

// create exam
router.post("/create-exam", createExamController);
// get all exams
router.get("/get-all-exams", getAllExamController);
// get single exam
router.get("/single-exam/:id",getSingleExamController);
// update exam
router.put("/update-exam/:id",updateExamController);
// delete exam
router.delete("/delete-exam/:id",deleteExamController);
export default router;
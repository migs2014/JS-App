import express from "express";
import {
  createAttendanceController,
  deleteAttendanceController,
  getAllAttendanceController,
  getSingleAttendanceController,
  updateAttendanceController,
} from "../controller/attendanceController.js";
import { adminToken } from "../middleware/auth.js";
const router = express.Router();
 
// create attendance
router.post("/create-attendance",adminToken, createAttendanceController);
// get all attendance
router.get("/get-all-attendance",adminToken, getAllAttendanceController);
// get single attendance
router.get("/single-attendance/:id",getSingleAttendanceController)
// update attendance
router.put("/update-attendance/:id",adminToken,updateAttendanceController);
// delete attendance
router.delete("/delete-attendance/:id",adminToken,deleteAttendanceController);
export default router;

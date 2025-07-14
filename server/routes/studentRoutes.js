import express from "express";
import {
  createStudentController,
  deleteStudentController,
  getAllStudentsController,
  getStudentProfileController,
  logOutStudentController,
  singleStudentController,
  updateStudentController,
} from "../controller/studentController.js";
import { isAuthenticated, studentToken } from "../middleware/auth.js";
const router = express.Router();

// create student
router.post("/create-student", createStudentController);
// get single student
router.get("/get-single-student/:id", singleStudentController);
// get all students
router.get("/get-all-students",getAllStudentsController);
// update student
router.put("/update-student/:id",updateStudentController);
// delete student
router.delete("/delete-student/:id",deleteStudentController);
// log out student
router.get("/logOut-student",studentToken,logOutStudentController)
// Get student Profile
router.get("/student-profile/:id",isAuthenticated, studentToken, getStudentProfileController)
export default router;

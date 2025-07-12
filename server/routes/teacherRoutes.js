import express from "express";
import {
  createTeacherController,
  getAllTeacherController,
  getSingleTeacher,
  updateTeacherController,
  deleteTeacherController,
  logOutTeacher,
  getTeacherController
} from "../controller/teacherController.js";
import { adminToken, isAuthenticated, teacherToken } from "../middleware/auth.js";
const router = express.Router();

// create teacher
router.post("/create-teacher", adminToken, createTeacherController);
// get all teachers
router.get("/get-teachers", adminToken, getAllTeacherController);
// get single teacher
router.get("/single-teacher/:id", adminToken, getSingleTeacher);

// update teacher
router.put("/update-teacher/:id", adminToken, updateTeacherController);

// delete teacher
router.delete("/delete-teachers/:id", deleteTeacherController);
// logout teacher
router.get("/logOut-teacher",teacherToken,logOutTeacher)
// teacher Profile
router.get("/me",isAuthenticated,getTeacherController)
export default router;

import express from "express";
import {
  createClassController,
  deleteClassController,
  getAllClassController,
  singleClassController,
  updatedClassController
} from "../controller/classController.js";
import { adminToken } from "../middleware/auth.js";

const router = express.Router();
// create a class/grade
router.post("/create-class", adminToken, createClassController);
// get all classes
router.get("/get-all-classes",adminToken, getAllClassController);
// get single class
router.get("/single-class/:id",adminToken,singleClassController);
// updated class
router.put("/updated-class/:id",adminToken,updatedClassController);
// delete class
router.delete("/delete-class/:id",adminToken,deleteClassController);
export default router;

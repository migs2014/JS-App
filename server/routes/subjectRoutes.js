import express from "express";
import { createSubjectController, deleteSubjectController, getAllSubjectController, getSingleSubjectController, updateSubjectController } from "../controller/subjectController.js";
const router =express.Router();

// create subject
router.post("/create-subject",createSubjectController);
// get all subjects
router.get("/get-all-subject",getAllSubjectController)
//get single subject
router.get("/single-subject/:id",getSingleSubjectController)
// update subject
router.put("/update-subject/:id",updateSubjectController);
// delete subject
 router.delete("/delete-subject/:id",deleteSubjectController);
export default router;

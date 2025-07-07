import express from "express";
import { createUserController } from "../controller/userController.js";
const router = express.Router();

//create user
router.post("/create-user",createUserController)


export default router; 
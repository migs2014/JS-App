import express from "express";
import { createUserController } from "../controller/userController";
const router = express.Router();

//create user
router.post("/create_user",createUserController)


export default router
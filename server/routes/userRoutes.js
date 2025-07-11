import express from "express";
import {
  createUserController,
  logInUseController,
  createAdminController,
  getSingleAdmin,
  logOutAdmin,
  getAdminProfile,
  getCurrentUser,
  getAllUsers
} from "../controller/userController.js";
import { adminToken, isAuthenticated} from "../middleware/auth.js";


const router = express.Router();

//create user
router.post("/create-user", createUserController);
// login user
router.post("/login-user", logInUseController);
// Admin create
 router.post("/create-admin", adminToken, createAdminController);
// Get single admin
router.get("/single-admin/:id",adminToken,getSingleAdmin);
// admin Logout
router.get("/logOut-admin",adminToken,logOutAdmin);

// get admin profile
router.get("/admin-profile", isAuthenticated,adminToken, getAdminProfile); 

// Get current user
router.get("/me",isAuthenticated,getCurrentUser)

// get all users
router.get("/all-users",isAuthenticated,getAllUsers)
export default router;
 
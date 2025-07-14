import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";
import User from "../model/userModel.js";
import  {errorHandleMiddleware} from "./errorHandleMiddleware.js";
//This for registered user
export const isAuthenticated = async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.teacherToken ||
    req.cookies.studentToken;
  if (!token) {
    return next(new ErrorHandler("User Id not Authenticated", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorHandler("User not Found", 404));
    }
  } catch (error) {
    return next(new Error("Invalid token", 401));
  }
};

//this for student token
export const studentToken = errorHandleMiddleware(async (req, res, next) => {  
  const token = req.cookies.studentToken;
  if (!token) {
    return next(new ErrorHandler("Student not authenticated", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user || req.user.role !== "Student") {
      return next(new ErrorHandler("student not Authorized"));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

// This is teacher token
export const teacherToken = errorHandleMiddleware(async (req, res, next) => {
  const token = req.cookies.teacherToken;
  if (!token) {
    return next(new ErrorHandler("Teacher not authenticated", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user || req.user.role !== "Teacher") {
      return next(new ErrorHandler("Teacher not Authorized"));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

// This is Admin token
export const adminToken = errorHandleMiddleware(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user || req.user.role !== "Admin") {
      return next(new ErrorHandler("Admin not Authorized"));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});
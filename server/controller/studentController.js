import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Student from "../model/studentModel.js";
//create student
export const createStudentController = errorHandleMiddleware(
  async (req, res, next) => {
    const {
      userId,
      classId,
      section,
      rollNumber,
      admissionDate,
      guardianInfo,
    } = req.body;
    if (!userId || !classId || !section || !admissionDate) {
      return next(new ErrorHandler("Please Provide all required fields", 400));
    }
    // Existing student in database
    const existingStudent = await Student.findOne({ classId, rollNumber });
    if (existingStudent) {
      return next(new ErrorHandler("Roll(Admno) Number already Exists!", 200));
    }
    const student = await Student.create({
      userId,
      rollNumber,
      classId,
      section,
      admissionDate,
      guardianInfo,
    });
    //  Success response
    res.status(201).json({
      success: true,
      message: "student create Successful",
      student,
    });
  }
);
// get single student
export const singleStudentController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const student = await Student.findById(req.params.id)
        .populate("userId")
        .populate("classId");
      if (!student) {
        return next(new ErrorHandler("Student Not Found", 404));
      }
      // response here
      res.status(200).json({
        success: true,
        message: "Student Found Successfully",
        student,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in single student controller",
        error,
      });
    }
  }
);
// get all students
export const getAllStudentsController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const student = await Student.find()
        .populate("userId")
        .populate("classId");
      if (student.length === 0) {
        return next(new ErrorHandler("Students not Found", 404));
      }
      // response here
      res.status(200).json({
        success: true,
        message: "Students Found successfully",
        student,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Getting All students controller",
        error,
      });
    }
  }
);
// update a student
export const updateStudentController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!student) {
        return next(new ErrorHandler("Student Not Found", 404));
      }
      // response
      res.status(200).json({
        success: true,
        message: "Student Updated Successfully",
        student,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error updating student Controller",
        error,
      });
    }
  }
);
// delete a student
export const deleteStudentController = errorHandleMiddleware(
  async (req, res, next) => {
    const { id } = req.params;
    const student = await Student.findById(id).populate("userId");
    if (!student || student.userId.role !== "Student") {
      return next(new ErrorHandler("Student Not found"), 404);
    }
    await student.deleteOne();
    // response
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  }
);
// logOut Student
export const logOutStudentController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      res
      .status(200)
      .cookie("studentToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Student Logged Out Successfully",
      });
    } catch (error) {
      next(new ErrorHandler("LogOut failed",500))
    }
  }
);
// Student Profile
export const getStudentProfileController =errorHandleMiddleware(async(req,res,next)=>{
  try {
    const student = await Student.findById(req.user._id);
    if(!student){
      return next(new ErrorHandler("Student Not found",404))
    }
    // response
    res.status(200).json({
      success: true,
      message: "Student Profile Found",
      student,
    });
  } catch (error) {
    next(new ErrorHandler("Something Went Wrong",500))
  }
});
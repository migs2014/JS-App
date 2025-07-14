import { teacherToken } from "../middleware/auth.js";
import {errorHandleMiddleware} from "../middleware/errorHandleMiddleware.js"
import ErrorHandler from "../middleware/errorMiddleware.js";
import Teacher from "../model/teacherModel.js";

// create teacher
export const createTeacherController = errorHandleMiddleware(async(req,res,next)=>{
    try {
        const {userId, subject, department, hireDate,qualification}= req.body;
        if(!userId || !subject || !department || !hireDate ||!qualification){
            return next (new ErrorHandler("Please provide all required fields",400));
        }
        const teacher = await Teacher.create({
            userId,
            subject,
            department,
            hireDate,
            qualification,
        });
        // response
        res.status(200).json({
            success: true,
            message: "Teacher Created Successfully",
            teacher,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Creating Teacher Controller",
            error,
        });

    }
});
// get all teacher
export const getAllTeacherController = errorHandleMiddleware(async(req,res,next)=>{
    try {
        const teachers = await Teacher.find().populate("userId")
        if(teachers.length ===0){
            return next(new ErrorHandler("Teacher Not found",404));
        }
        res.status(200).json({
            success: true,
            message: "Teacher retrived successfully",
            teachers,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
           success: true,
           message: "Error in Getting all teacher controller",
           error 
        })
    }
});
// get a single teacher
export const getSingleTeacher = errorHandleMiddleware(async(req,res,next)=>{
    try {
        const teacher = await Teacher.findById(req.params.id).populate("userId")
        if(!teacher){
            return next(new ErrorHandler("Teacher Not Found"),404);
        }
        res.status(200).json({
            success: true,
            message: "Teacher Found successfully",
            teacher,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in get single teacher",
            error
        })
    }
});

// update teacher
export const updateTeacherController = errorHandleMiddleware(
    async (req, res, next)=>{
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runvalidators:true
    });
    if(!teacher){
        return next(new ErrorHandler("Teacher Not Found",404))
    }
    res.status(200).json({
        success: true,
        message: "Teacher updated Successfully",
        teacher,
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in updated Teacher controller",
            error,
        })
    }
});

// Delete teacher
export const deleteTeacherController = errorHandleMiddleware(
    async (req, res, next)=>{
    try {
        const  id = req.params.id;
        const teacher = await Teacher.findByIdAndDelete(id).populate("userId");
    if(!teacher || teacher.userId.role !=="Teacher"){
        return next(new ErrorHandler("Teacher Not Found",404))
    }
    res.status(200).json({
        success: true,
        message: "Teacher Deleted Successfully",
        
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Deleting Teacher controller",
            error,
        })
    }
});

// log out
export const logOutTeacher = errorHandleMiddleware(async(req,res,next)=>{
    res
    .status(200)
    .cookie("teacherToken",null,{
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .send({
        success: true,
        message: "Teacher Logged Out successfully",
    });
});

// teacher profile
export const getTeacherController=errorHandleMiddleware(async(req,res,next)=>{
    try {
    const teacher = await teacherToken.findById(req.user.id)
    if(!teacher ) {
      return next (new ErrorHandler("Teacher Not Found or Unauthorize",404))
    }
    //if teacher is found then respond
    res.status(200).json({
      success: true,
      message: "Teacher Profile found Successfully",
      teacher,
    }) 
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false, 
      message: "Error in Teacher profile controller",
      error
    })
  }
});

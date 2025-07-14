import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Class from "../model/classModel.js";
// create class
export const createClassController =errorHandleMiddleware(async(req,res,next)=>{
    try {
        const{name,sections} =req.body;
        if(!name){
            return next(new ErrorHandler("Please provide class Name",400));
        }
        // check if class already exists
        const existingClass = await Class.findOne({name});
        if(existingClass){
            return next(
                new ErrorHandler("Class with this name already exists",400)
            );
        }
        const classData = await Class.create({
            name,
            sections: sections || [],
        });
        res.status(200).json({
            success: true,
            message: "Class created Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in Class controller"
        })
    }
});

// Get all class
export const getAllClassController = errorHandleMiddleware(async(req,res,next)=>{
    try {
        const classes = await Class.find().sort("name")
        if(classes.length === 0){
            return next (new ErrorHandler("Classes Not found",404))
        }
        // response here
        res.status(200).json({
            success: true,
            message: "Classes retrieved successfully",
            classes,
        })
    } catch (error) {
        console.log(error)
        res.status(500).jsons({
            success: true,
            message: "Error in Getting All class controller",
            error,
        })
    }
});

// get single class
export const singleClassController =errorHandleMiddleware(async(req,res,next)=>{
   try {
        const {id} = req.params;
        const classData =await Class.findById(id)
        if(!classData){
            return next (new ErrorHandler("Class Not found",404))
        }
        // response here
        res.status(200).json({
            success: true,
            message: "Classes retrieved successfully",
            classData,
        })
    } catch (error) {
        console.log(error)
        res.status(500).jsons({
            success: true,
            message: "Error in Getting single class controller",
            error,
        })
    } 
});
// update class
export const updatedClassController =errorHandleMiddleware(async(req,res,next)=>{
    try {
         const {sections} = req.body;
         const classData = await Class.findById(req.params.id);
         if(!classData) {
            return next (new ErrorHandler("Class Not Found",404))
         }
         classData.sections = sections || classData.sections;
         const updatedClass = await classData.save();
         res.status(200).json({
            success: true,
            message: "Section Updated successfully",
            updatedClass,
         })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Error in Updated controller",
            error,
        })
    }
});
// Delete controller
export const deleteClassController = errorHandleMiddleware(async(req,res,next)=>{
    try {
        const {id} =req.params;
        const deleteClass = await Class.findById(id)
        if(!deleteClass){
            return next (new ErrorHandler("Class Not found",400))
        }
        // response her
        res.status(200).json({
            success:true,
            message: "Class Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in Delete class controller",
            error,
        })
    }
});
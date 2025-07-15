import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Subject from "../model/subjectModel.js";

// create subject
export const createSubjectController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { name, classId, teacherId } = req.body;
      if (!name || !classId || !teacherId) {
        return next(new ErrorHandler("Fill all fields", 400));
      }
      const subject = await Subject.create({ name, classId, teacherId });
      res.status(201).json({
        success: true,
        message: "Subject created Successfully",
        subject,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in create Subject Controller",
        error,
      });
    }
  }
);
// get all subjects
export const getAllSubjectController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const subjects = await Subject.find()
        .populate("classId")
        .populate({
          path: "teacherId",
          populate: {
            path: "userId",
            model: "User",
          },
        });
      if (subjects.length === 0) {
        return next(new ErrorHandler("subject Not Found", 400));
      }
      // response here
      res.status(200).json({
        success: true,
        message: "Fetching All Subject Successfully",
        subjects,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Get all subject Controller",
        error,
      });
    }
  }
);
// get single subject by ID
export const getSingleSubjectController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const subject = await Subject.findById(req.params.id)
        .populate("classId")
        .populate("teacherId");
      if (!subject) {
        return next(new ErrorHandler("Subject Not Found", 404));
      }
      // response
      res.status(200).json({
        success: true,
        message: "Subject Found Successfully",
        subject,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Get all subject Controller",
      });
    }
  }
);
// update subject
export const updateSubjectController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, classId } = req.body;
      const subject = await Subject.findById(id);
      if (!subject) {
        return next(new ErrorHandler("Subject Not Found"));
      }
      // only allow updating name and ClassId
      subject.name = name || subject.name;
      subject.classId = classId || subject.classId;

      const updatedSubject = await subject.save()
      res.status(200).json({
        success:true,
        message: "Subject Updated Successfully",
        subject:updatedSubject
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Update subject Controller",
      });
    }
  }
);
// delete subject
export const deleteSubjectController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
        const {id}=req.params;
        const subject=await Subject.findById(id)
        if(!subject){
            return next(new ErrorHandler("Subject Not Found",400))
        }
        await subject.deleteOne()
        res.status(200).json({
            success: true,
            message: "Subject Deleted Successfully"
        })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Delete subject Controller",
      });
    }
  }
);

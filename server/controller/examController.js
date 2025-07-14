import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Class from "../model/classModel.js";
import Exam from "../model/examModel.js";

// Create exam
export const createExamController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { name, classId, startDate, endDate } = req.body;
      if (!name || !classId || !startDate || !endDate) {
        return next(new ErrorHandler("Please fill all Fields", 400));
      }
      //  validation class exists
      const classExist = await Class.findById(classId);
      if (!classExist) {
        return next(new ErrorHandler("Class Not Found", 404));
      }
      //   validate date order
      if (new Date(startDate) > new Date(endDate)) {
        return next(
          new ErrorHandler("Start date Must be before end Date", 400)
        );
      }
      //   check for overlapping exams
      const overlappingExam = await Exam.findOne({
        classId,
        $or: [
          { startDate: { $lte: new Date(endDate) } },
          { endDate: { $gte: new Date(startDate) } },
        ],
      });
      if (!overlappingExam) {
        return next(
          new ErrorHandler("Exam Dates overlap with an existing exam", 400)
        );
      }
      // if then sucess,then create exam
      const exam = await Exam.create({
        name,
        classId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      const populateExam = await Exam.findById(exam._id).populate(
        "classId",
        "name"
      );
      // response here
      res.status(201).json({
        success: true,
        message: "Exam created Successfully",
        populateExam,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in creating Exam Controller",
        error,
      });
    }
  }
);
//get all exam
export const getAllExamController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const exams = await Exam.find().populate("classId", "name");
      if (exams.length === 0) {
        return next(new ErrorHandler("No Exam Found", 400));
      }
      // if found then response
      res.status(200).json({
        success: true,
        message: "Exams Found Successfully",
        exams,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Creating All Exam Controller",
        error,
      });
    }
  }
);
// get Single exam
export const getSingleExamController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const exam = await Exam.findById(id).populate("classId");
      if (!exam) {
        return next(new ErrorHandler("Exam not Found", 400));
      }
      // response here
      res.status(200).json({
        success: true,
        message: "Exam found Successfully",
        exam,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in single Exam Controller",
        error,
      });
    }
  }
);
// update exam
export const updateExamController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, startDate, endDate } = req.body;
      const exam = await Exam.findById(id);
      if (!exam) {
        return next(new ErrorHandler("Exam Not Found", 400));
        // validation date -if dates are being updated
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
          return next(
            new ErrorHandler("Start date must be before end date", 400)
          );
        }
        // check for overlapping exam
        if (startDate || endDate) {
          const newStart = startDate ? new Date(startDate) : exam.startDate;
          const newEnd = endDate ? new Date(endDate) : exam.endDate;
        }
        const overlappingExam = await Exam.findOne({
            classId:exam.classId,
            _id:{$ne:exam._id},
            $or:[{startDate:{$lte:newEnd}},{endDate:{$lte:newStart}}]
        });
        if(overlappingExam){
            return next(new ErrorHandler("Exam dates overlap with an existing exam(s)",400));
        }
      }
      const updatedExam=await Exam.findByIdAndUpdate(
        id,
        {name,startDate,endDate},
        {new:true,runValidators:true}
      ).populate("classId","name");
    //   response
    res.status(200).json({
        success:true,
        messages: "Exam updated Successfully",
        updatedExam,
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Updating Exam Controller",
        error,
      });
    }
  }
);
// delete exam
export const deleteExamController =errorHandleMiddleware(async(req,res,next)=>{
   try {
    const {id}=req.params;
    const exam=await Exam.findByIdAndDelete(id)
    if(!exam){
        return next(new ErrorHandler("Exam not Found",400));
    }
    // response
    res.status(200).json({
        success: true,
        message:"exam Deleted successfully",
    });
   } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Deleting Exam Controller",
        error,
      });
   } 
})
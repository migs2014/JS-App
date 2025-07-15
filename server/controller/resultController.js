import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Result from "../model/resultModel.js";

// create exam
export const createResultController = errorHandleMiddleware(
  async (req, res, next) => {
    try {
      const { studentId, examId, subject, marksObtained, totalMarks, grade } =
        req.body;
      if (
        !studentId ||
        !examId ||
        !subject ||
        !marksObtained ||
        !totalMarks ||
        !grade
      ) {
        return next(new ErrorHandler("Please provide all fields", 400));
      }
      // validation marks
      if (marksObtained < 0 || totalMarks < 0 || marksObtained > totalMarks) {
        return next(
          new ErrorHandler("Invalid marks provided, Fill correctly", 400)
        );
      }
      //   check this result already exist for this student , exam and subject
      const existingResult = await Result.findOne({
        studentId,
        examId,
        subject,
      });
      if (existingResult) {
        return next(new ErrorHandler("Result exists already", 400));
      }
      //Create result
      const result = await Result.create({
        studentId,
        examId,
        subject,
        marksObtained,
        totalMarks,
        grade,
      });
      //   response
      res.status(201).json({
        success: true,
        message: "Result Created Succcessfully",
        result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in Creating Exam Controller",
        error,
      });
    }
  }
);

// get all exams
export const getAllResult = errorHandleMiddleware(async (req, res, next) => {
  try {
    const results = await Result.find()
      .populate("studentId")
      .populate("examId");
    if (results.length === 0) {
      return next(new ErrorHandler("Results Not Found", 404));
    }
    // if all result found then response here
    res.status(200).json({
      success: true,
      message: "Results retrieved Successfully",
      results,
    });
    res.status();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Creating Getting All result Controller",
      error,
    });
  }
});
// get single exam
export const getSingleResult = errorHandleMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id)
      .populate("studentId")
      .populate("examId");
    if (!result) {
      return next(new ErrorHandler("Result Not Found", 400));
    }
    //response here
    res.status(200).json({
      success: true,
      message: "Result Found Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Creating Getting All result Controller",
      error,
    });
  }
});
// update the result
export const updateResult = errorHandleMiddleware(async (req, res, next) => {
  try {
    const { marksObtained, totalMarks } = req.body;
    if (marksObtained !== undefined && totalMarks !== undefined) {
      if (marksObtained < 0 || totalMarks <= 0 || marksObtained > totalMarks) {
        return next(new ErrorHandler("Invalid Marks", 400));
      }
    }
    const result = await Result.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runvalidators:true,
    })
      .populate("studentId")
      .populate("examId");
    if (!result) {
      return next(new ErrorHandler("Result Not Found", 400));
    }
    //response here
    res.status(200).json({
      success: true,
      message: "Result Found Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Creating updating result Controller",
      error,
    });
  }
});
// delete the result
export const deleteResultcontroller =errorHandleMiddleware(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const result=await Result.findByIdAndDelete(id)
        if(!result){
            return next(new ErrorHandler("Result Not Found",404))
        }
        // response her
        res.status(200).json({
            success:true,
            message:"Result Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Creating deleting result Controller",
      error,
    });   
    }
});
